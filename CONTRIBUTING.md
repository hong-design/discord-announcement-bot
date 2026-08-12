# Contributing

Thanks for your interest in improving Discord Announcement Bot.

This is an open-source project and contributions are welcome, including bug fixes, documentation improvements, new announcement workflows, tests, and accessibility or developer-experience improvements.

## Before You Start

For small fixes, feel free to open a pull request directly. For larger features or behavior changes, opening an issue first is recommended so the approach can be discussed before implementation.

## Local Development

1. Fork the repository.
2. Clone your fork.
3. Install dependencies:

```bash
npm install
```

4. Copy the example environment file:

```bash
cp .env.example .env
```

5. Add a Discord bot token to `.env`.
6. Run the bot:

```bash
npm start
```

## Pull Requests

Please keep pull requests focused on one change where practical.

Before submitting:

- Make sure the bot starts successfully.
- Run `npm run lint`.
- Do not commit bot tokens, server IDs, private configuration, or other secrets.
- Update documentation when behavior or commands change.
- Explain what changed and why in the pull request description.

## Good First Contributions

Useful starter contributions include:

- Improving command error messages
- Adding tests
- Improving documentation and examples
- Adding announcement previews
- Migrating commands to Discord slash commands
- Adding persistent per-server configuration

## Security Issues

Please do not open a public issue for a vulnerability that could put bot tokens or Discord servers at risk. See `SECURITY.md` for guidance.

## License

By contributing, you agree that your contributions will be licensed under the repository's ISC License.
