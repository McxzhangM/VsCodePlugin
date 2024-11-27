## GitHub Copilot Chat

- Extension Version: 0.22.4 (prod)
- VS Code: vscode/1.95.3
- OS: Mac

## Network

User Settings:
```json
  "github.copilot.advanced": {
    "debug.useElectronFetcher": true,
    "debug.useNodeFetcher": false
  }
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 198.19.4.121 (33 ms)
- DNS ipv6 Lookup: ::ffff:198.19.4.121 (11 ms)
- Electron Fetcher (configured): HTTP 200 (739 ms)
- Node Fetcher: HTTP 200 (417 ms)
- Helix Fetcher: HTTP 200 (573 ms)

Connecting to https://api.business.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.21 (1 ms)
- DNS ipv6 Lookup: ::ffff:140.82.114.21 (1 ms)
- Electron Fetcher (configured): HTTP 200 (315 ms)
- Node Fetcher: HTTP 200 (866 ms)
- Helix Fetcher: HTTP 200 (874 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).