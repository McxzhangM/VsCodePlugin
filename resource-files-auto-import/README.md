# Resource Files Auto Import

This is a VS Code extension that automatically imports resource files and generates the corresponding `index.ts` file.

## Function

- Automatically scan resource files in the specified directory (supports `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg` formats).

- Generate an `index.ts` file containing all resource file imports and exports.

## Installation

1. Clone or download this project to your local computer.

2. Open the project folder in VS Code.

3. Run `npm install` to install dependencies.

## Usage

1. Press `F5` to start the extended debugging mode.

2. In the debug window, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the command palette.

3. Enter and select the `Import Resource Files` command.
4. Enter the resource folder path (for example: `src/res`), the extension will automatically scan the resource files in the directory and generate the `index.ts` file.

## Configuration

The extension will cache the resource folder path entered last time into `globalState`, the default path is `src/res`.

## Known Issues

- No known issues yet.

## Contributions

Welcome to submit issues and request features. If you want to contribute code, please fork this project and submit a pull request.

## Release History

### 0.0.1

- Initial release version.

## License

This project uses the [MIT License](LICENSE).