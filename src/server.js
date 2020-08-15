const TelegramBot = require('node-telegram-bot-api');
const { tokenBot } = require('../config/index');


module.exports = new TelegramBot(tokenBot, { polling: true });
