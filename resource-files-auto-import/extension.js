const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // console.log('Congratulations, your extension "resource-files-auto-import" is now active!');

    // const disposable = vscode.commands.registerCommand('resource-files-auto-import.helloWorld', function () {
    //     vscode.window.showInformationMessage('Hello World from Resource Files Auto Import!');
    // });

    // context.subscriptions.push(disposable);

    /**
     * @param {string} str
     */
    function toCamelCase(str) {
        return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
    }

    const resImportDisposable = vscode.commands.registerCommand('res-import', async function () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace is open');
            return;
        }

        // Get user input for src and res folder paths
        const CachePath = context.globalState.get('srcResPath') || 'src/res';

        const srcResPath = await vscode.window.showInputBox({ prompt: 'Please enter the folder path (e.g., src/res)', value: CachePath });
        if (srcResPath) {
            context.globalState.update('srcResPath', srcResPath);
        } else {
            vscode.window.showErrorMessage('Invalid path entered');
            return;
        }

        const srcDir = path.join(workspaceFolders[0].uri.fsPath, srcResPath);
        const outputFile = path.join(srcDir, 'index.ts');
        const supportedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
        const fileNames = new Map();

        // Recursively read all files in the directory
        /**
         * @param {fs.PathLike} dir
         */
        function readDirRecursive(dir) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    readDirRecursive(fullPath);
                } else {
                    const ext = path.extname(file).toLowerCase();
                    if (supportedExtensions.includes(ext)) {
                        let baseName = path.basename(file, ext);
                        // Remove @2x or @3x suffix
                        baseName = baseName.replace(/@\dx$/, '');
                        // Convert to camelCase
                        const camelCaseName = toCamelCase(baseName);
                        // Get relative path to srcDir
                        let relativePath = path.relative(srcDir, fullPath);
                        relativePath = relativePath.replace(/@\d+x/, '');
                        fileNames.set(camelCaseName, relativePath);
                    }
                }
            });
        }

        // Read srcDir directory
        readDirRecursive(srcDir);

        // Generate import and export statements
        let importStatements = '';
        let exportStatements = 'export const resources = {\n';
        fileNames.forEach((relativePath, name) => {
            importStatements += `import ${name} from './${relativePath}';\n`;
            exportStatements += `  ${name},\n`;
        });
        exportStatements += '};\n';

        // Write to index.ts file
        const content = importStatements + '\n' + exportStatements;
        fs.writeFile(outputFile, content, err => {
            if (err) {
                vscode.window.showErrorMessage('Failed to write file: ' + err.message);
            } else {
                vscode.window.showInformationMessage('Resource files successfully imported and exported to index.ts');
            }
        });
    });

    context.subscriptions.push(resImportDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}