const bot = require('../config');

module.exports = (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `@${msg.new_chat_participant.username}, juntou-se ao grupo!`);
};
