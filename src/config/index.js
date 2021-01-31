const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');

module.exports = new TelegramBot(process.env.TOKEN_BOT, { polling: true });
