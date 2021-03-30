const request = require('request');
const bot = require('../config');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const generateAndress = match[1];
  const user = `@${msg.from.username}` || msg.from.first_name;

  if (generateAndress !== 'generateandress') {
    bot.sendMessage(chatId, `${user}, Invalid command...\n\n`);
    return new Error({
      error: 'command',
    });
  }

  bot.sendMessage(chatId, `${user}, Generating data, please wait...\n\n`);

  request(
    `https://generatedatas.herokuapp.com/api/${generateAndress}`,
    (error, result) => {
      if (error || result.statusCode !== 200)
        return bot.sendMessage(
          chatId,
          `${user}, ${generateAndress} Error! ${result.body}`
        );

      const res = JSON.parse(result.body);

      const { cep, address, neighborhood, city, state } = res[0];

      bot.sendMessage(
        chatId,
        '*Result*\n' +
          `*Cep*: ${cep}\n` +
          `*Andress*: ${address}\n` +
          `*Neighborhood*: ${neighborhood}\n` +
          `*City*: ${city}\n` +
          `*State*: ${state}\n`,
        {
          parse_mode: 'markdown',
        }
      );
    }
  );
};
