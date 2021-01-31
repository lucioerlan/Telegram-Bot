const request = require('request');
const bot = require('../config');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const searchCep = match[1];
  const user = `@${msg.from.username}` || msg.from.first_name;

  bot.sendMessage(chatId, `${searchCep}, Searching Cep, please wait...\n\n`);

  request(`https://cep.awesomeapi.com.br/${searchCep}`, (error, result) => {
    if (error || result.statusCode !== 200)
      return bot.sendMessage(
        chatId,
        `${user}, ${searchCep} Error! ${result.body}`
      );

    const res = JSON.parse(result.body);

    const {
      cep,
      address_type,
      address_name,
      address,
      state,
      district,
      lat,
      lon,
      city,
      city_ibge,
      ddd,
    } = res;

    bot.sendMessage(
      chatId,
      '*Result*\n' +
        `*Cep*: ${cep}\n` +
        `*Address Type*: ${address_type}\n` +
        `*Address Name*: ${address_name}\n` +
        `*Address*: ${address}\n` +
        `*State*: ${state}\n` +
        `*District*: ${district}\n` +
        `*Locate*: ${lat} ${lon}\n` +
        `*City*: ${city}\n` +
        `*City Ibge*: ${city_ibge}\n` +
        `*ddd*: ${ddd}\n`,
      {
        parse_mode: 'markdown',
      }
    );
  });
};
