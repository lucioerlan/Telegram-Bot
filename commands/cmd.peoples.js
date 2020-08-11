const bot = require('../src/server');
const request = require('request');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const generatePeoples = match[1];
  const user = '@' + msg.from.username || msg.from.first_name;

  if (generatePeoples !== 'generatepeoples') {
    bot.sendMessage(chatId, `${user}, Invalid command...\n\n`);
    return new Error({
      error: 'command',
    });
  }

  bot.sendMessage(chatId, `${user}, Generating data, please wait...\n\n`);

  request(
    `https://generatedatas.herokuapp.com/api/${generatePeoples}`,
    (error, result) => {
      if (error || result.statusCode !== 200)
        return bot.sendMessage(
          chatId,
          `${user}, ${generatePeoples} Error! ${result.body}`
        );

      const res = JSON.parse(result.body);

      const {
        name,
        age,
        cpf,
        rg,
        data_nasc,
        sex,
        sign,
        mother,
        father,
        email,
        mobile,
        height,
        weight,
        blood_type,
      } = res[0];

      bot.sendMessage(
        chatId,
        '*Result*\n' +
          `*Name*: ${name}\n` +
          `*Age*: ${age}\n` +
          `*Cpf*: ${cpf}\n` +
          `*Rg*: ${rg}\n` +
          `*Date of birth*: ${data_nasc}\n` +
          `*Sex*: ${sex}\n` +
          `*Sign*: ${sign}\n` +
          `*Mother*: ${mother}\n` +
          `*Father*: ${father}\n` +
          `*E-mail*: ${email}\n` +
          `*Mobile*: ${mobile}\n` +
          `*Height*: ${height}\n` +
          `*Weight*: ${weight}\n` +
          `*Blood Type*: ${blood_type}`,
        {
          parse_mode: 'markdown',
        }
      );
    }
  );
};
