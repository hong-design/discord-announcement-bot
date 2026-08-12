# Discord Announcement Bot

A lightweight Discord bot for composing and publishing announcement embeds through simple chat commands.

> Built with Node.js and discord.js. The project is intentionally small and easy to understand, making it suitable as a starter bot, learning project, or base for a more complete Discord announcement system.

## Features

- Select an announcement channel
- Set announcement text
- Set the embed color with a HEX value
- Attach one or more images
- Clear uploaded images
- Reset the current announcement configuration
- Publish the final announcement as a Discord embed

## Commands

| Command | Description | Example |
| --- | --- | --- |
| `!設定公告頻道` | Set the channel where announcements will be sent | `!設定公告頻道 #公告` |
| `!設定公告文字` | Set the announcement content | `!設定公告文字 伺服器將於今晚維護` |
| `!設定公告顏色` | Set the embed color | `!設定公告顏色 #5865F2` |
| `!上傳圖片` | Add image attachments to the announcement | Send the command with image attachments |
| `!清空圖片` | Remove all queued announcement images | `!清空圖片` |
| `!清除所有` | Reset channel, text, images, and color | `!清除所有` |
| `!發送公告` | Publish the announcement | `!發送公告` |

## Getting Started

### Requirements

- Node.js 18 or newer
- A Discord application and bot token
- Message Content Intent enabled for the bot

### Installation

```bash
git clone https://github.com/hong-design/discord-announcement-bot.git
cd discord-announcement-bot
npm install
```

### Environment variable

The bot currently reads its token from the `token` environment variable.

Create a `.env` file or configure the variable in your hosting environment:

```env
token=YOUR_DISCORD_BOT_TOKEN
```

Do not commit your real bot token to GitHub.

### Run

```bash
node index.js
```

## How It Works

The bot keeps the current announcement configuration in memory. You first select a channel and build the announcement using commands, then use `!發送公告` to publish it.

Example flow:

```text
!設定公告頻道 #公告
!設定公告文字 歡迎加入我們的 Discord 伺服器！
!設定公告顏色 #5865F2
!上傳圖片 + image attachment
!發送公告
```

## Current Limitations

This is an early version of the project. Current configuration is stored only in memory, so settings are lost when the bot restarts. Commands are also message-prefix commands rather than Discord slash commands.

Potential future improvements include:

- Slash commands (`/announcement`)
- Permission checks for administrators/moderators
- Persistent storage
- Announcement preview before publishing
- Multiple announcement templates
- Scheduled announcements
- Better image handling
- Multi-server configuration

## Security Note

Before using this bot in a public server, add permission checks so regular members cannot change announcement settings or publish announcements.

## Tech Stack

- Node.js
- discord.js v14
- dotenv

## Contributing

Issues and pull requests are welcome. If you want to extend the bot, improve the documentation, or propose a better announcement workflow, feel free to contribute.

## License

This repository currently uses the ISC license declared in `package.json`.
