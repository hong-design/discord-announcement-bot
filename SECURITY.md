# Security Policy

## Reporting a Vulnerability

Please avoid publishing exploitable security details in a public issue before a fix is available.

If you discover a vulnerability, use GitHub's private vulnerability reporting feature for this repository when available. If private reporting is not enabled, open an issue that only states that you found a potential security problem and asks the maintainer for a private contact method; do not include secrets, exploit steps, or sensitive server information in the public issue.

Examples of security-sensitive reports include:

- Bot token exposure
- Permission bypasses that allow unauthorized announcements
- Unexpected access to server or channel data
- Dependency vulnerabilities with a practical exploit path

## Secrets

Never commit a real Discord bot token, `.env` file, private server configuration, or credentials. If a token is exposed, rotate it immediately in the Discord Developer Portal rather than relying only on deleting it from Git history.

## Supported Version

Security fixes currently target the latest version on the default branch.
