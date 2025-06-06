const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let announcementChannelId = null;
let announcementText = '預設公告內容';
let announcementImages = [];
let announcementColor = '#ffffff'; // 預設白色

client.once(Events.ClientReady, () => {
    console.log(`✅ 已登入為 ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    // ✅ 設定公告頻道
    if (message.content.startsWith('!設定公告頻道')) {
        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('請標註一個頻道，例如：!設定公告頻道 #頻道名稱');
        announcementChannelId = channel.id;
        return message.reply(`✅ 公告頻道設定為 ${channel}`);
    }

    // ✅ 設定公告文字
    if (message.content.startsWith('!設定公告文字')) {
        const text = message.content.replace('!設定公告文字', '').trim();
        if (!text) return message.reply('請提供公告內容，例如：!設定公告文字 您要公告的內容');
        announcementText = text;
        return message.reply(`✅ 公告內容設定為：${announcementText}`);
    }

    // ✅ 上傳圖片（附件）
    if (message.content.startsWith('!上傳圖片')) {
        if (message.attachments.size === 0) {
            return message.reply('請上傳圖片作為附件，例如：!上傳圖片（然後上傳圖片）');
        }
        message.attachments.forEach(attachment => {
            if (attachment.contentType && attachment.contentType.startsWith('image/')) {
                announcementImages.push(attachment.url);
            }
        });
        return message.reply(`✅ 已新增 ${message.attachments.size} 張圖片到公告`);
    }

    // ✅ 清空圖片
    if (message.content === '!清空圖片') {
        announcementImages = [];
        return message.reply('✅ 已清空公告圖片列表');
    }

    // ✅ 清除所有設定
    if (message.content === '!清除所有') {
        announcementChannelId = null;
        announcementText = '預設公告內容';
        announcementImages = [];
        announcementColor = '#ffffff';
        return message.reply('✅ 已清除公告頻道、內容、圖片與顏色設定');
    }

    // ✅ 設定公告顏色
    if (message.content.startsWith('!設定公告顏色')) {
        const color = message.content.replace('!設定公告顏色', '').trim();
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            return message.reply('請提供有效的 HEX 色碼，例如：!設定公告顏色 #ff0000');
        }
        announcementColor = color;
        return message.reply(`✅ 公告顏色設定為：${announcementColor}`);
    }

    // ✅ 發送公告（Embed + 圖片）
    if (message.content === '!發送公告') {
        if (!announcementChannelId) return message.reply('❗ 尚未設定公告頻道，用 !設定公告頻道 #頻道名稱');
        const channel = await client.channels.fetch(announcementChannelId);

        const embed = new EmbedBuilder()
            .setDescription(announcementText)
            .setColor(announcementColor);

        const files = announcementImages.map(url => ({ attachment: url }));

        await channel.send({
            embeds: [embed],
            files
        });

        message.reply('✅ 公告已發送');
        announcementImages = []; // 發送後清空圖片清單
    }
});

client.login(token);
