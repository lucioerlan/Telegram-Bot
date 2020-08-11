const bot = require('../src/server');

module.exports = (msg) => {
  const chatId = msg.chat.id;
  const user = '@' + msg.from.username || msg.from.first_name;

  bot.sendMessage(
    chatId,
    `${user} *Bot Commands:*\n\n` +
      '*Search for*\n' +
      '/ip 186.225.61.179 _Find location by IP address_\n' +
      '/cep 77825650 _Search address by Zip Code_\n' +
      '/cnpj 09376495000122 _Get all the data of a company looking for cnpj_\n' +
      '/currency price _View the current quote for various cryptocurrencies_\n' +
      '/plate QOZ1774 _Search all information through the vehicle plate_\n\n' +
      
      '*Data generator*\n' +
      '/peoples generatepeoples _Generate Peoples random data_\n' +
      '/andress generateandress _Generate Andress random data_\n',
    { parse_mode: 'markdown' }
  );
};
