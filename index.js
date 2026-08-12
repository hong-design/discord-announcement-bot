require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    Events,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js');

const token = process.env.DISCORD_TOKEN || process.env.token;

if (!token) {
    throw new Error('Missing Discord bot token. Set DISCORD_TOKEN (recommended) or token in your environment.');
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const guildSettings = new Map();

function createDefaultSettings() {
    return {
        announcementChannelId: null,
        announcementText: '預設公告內容',
        announcementImages: [],
        announcementColor: '#ffffff'
    };
}

function getGuildSettings(guildId) {
    if (!guildSettings.has(guildId)) {
        guildSettings.set(guildId, createDefaultSettings());
    }

    return guildSettings.get(guildId);
}

function canManageAnnouncements(message) {
    return message.member?.permissions.has(PermissionFlagsBits.ManageGuild) ?? false;
}

client.once(Events.ClientReady, () => {
    console.log(`✅ 已登入為 ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith('!')) return;

    const settings = getGuildSettings(message.guild.id);
    const supportedCommand = [
        '!設定公告頻道',
        '!設定公告文字',
        '!上傳圖片',
        '!清空圖片',
        '!清除所有',
        '!設定公告顏色',
        '!發送公告'
    ].some(command => message.content.startsWith(command));

    if (supportedCommand && !canManageAnnouncements(message)) {
        return message.reply('❌ 你需要「管理伺服器」權限才能使用公告管理指令。');
    }

    // 設定公告頻道
    if (message.content.startsWith('!設定公告頻道')) {
        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.reply('請標註一個頻道，例如：!設定公告頻道 #頻道名稱');
        }

        settings.announcementChannelId = channel.id;
        return message.reply(`✅ 公告頻道設定為 ${channel}`);
    }

    // 設定公告文字
    if (message.content.startsWith('!設定公告文字')) {
        const text = message.content.replace('!設定公告文字', '').trim();
        if (!text) {
            return message.reply('請提供公告內容，例如：!設定公告文字 您要公告的內容');
        }

        settings.announcementText = text;
        return message.reply(`✅ 公告內容設定為：${settings.announcementText}`);
    }

    // 上傳圖片（附件）
    if (message.content.startsWith('!上傳圖片')) {
        if (message.attachments.size === 0) {
            return message.reply('請上傳圖片作為附件，例如：!上傳圖片（然後上傳圖片）');
        }

        let addedImages = 0;
        message.attachments.forEach(attachment => {
            if (attachment.contentType?.startsWith('image/')) {
                settings.announcementImages.push(attachment.url);
                addedImages += 1;
            }
        });

        if (addedImages === 0) {
            return message.reply('❌ 沒有找到可用的圖片附件。');
        }

        return message.reply(`✅ 已新增 ${addedImages} 張圖片到公告`);
    }

    // 清空圖片
    if (message.content === '!清空圖片') {
        settings.announcementImages = [];
        return message.reply('✅ 已清空公告圖片列表');
    }

    // 清除所有設定
    if (message.content === '!清除所有') {
        guildSettings.set(message.guild.id, createDefaultSettings());
        return message.reply('✅ 已清除公告頻道、內容、圖片與顏色設定');
    }

    // 設定公告顏色
    if (message.content.startsWith('!設定公告顏色')) {
        const color = message.content.replace('!設定公告顏色', '').trim();
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            return message.reply('請提供有效的 HEX 色碼，例如：!設定公告顏色 #ff0000');
        }

        settings.announcementColor = color;
        return message.reply(`✅ 公告顏色設定為：${settings.announcementColor}`);
    }

    // 發送公告（Embed + 圖片）
    if (message.content === '!發送公告') {
        if (!settings.announcementChannelId) {
            return message.reply('❗ 尚未設定公告頻道，用 !設定公告頻道 #頻道名稱');
        }

        try {
            const channel = await client.channels.fetch(settings.announcementChannelId);

            if (!channel?.isTextBased()) {
                return message.reply('❌ 設定的公告頻道目前無法傳送文字訊息，請重新設定。');
            }

            const embed = new EmbedBuilder()
                .setDescription(settings.announcementText)
                .setColor(settings.announcementColor);

            const files = settings.announcementImages.map(url => ({ attachment: url }));

            await channel.send({
                embeds: [embed],
                files
            });

            settings.announcementImages = [];
            return message.reply('✅ 公告已發送');
        } catch (error) {
            console.error('Failed to send announcement:', error);
            return message.reply('❌ 公告發送失敗。請確認機器人具有查看頻道與傳送訊息的權限。');
        }
    }
});

client.login(token);
