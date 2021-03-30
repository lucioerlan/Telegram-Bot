require('dotenv/config');
const TelegramBot = require('node-telegram-bot-api');

module.exports = new TelegramBot(process.env.TOKEN_BOT, { polling: true });
