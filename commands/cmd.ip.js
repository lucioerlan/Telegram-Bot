const bot = require('../src/server');
const request = require('request');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const searchIp = match[1];
  const user = '@' + msg.from.username || msg.from.first_name;

  bot.sendMessage(chatId, `${user}, Searching IP, please wait...\n\n`);

  request(`http://ip-api.com/json/${searchIp}`, (error, result) => {
    if (error || result.statusCode !== 200)
      return bot.sendMessage(
        chatId,
        `${user}, ${searchIp} Error! ${result.body}`
      );

    const res = JSON.parse(result.body);

    const {
      status,
      country,
      countryCode,
      region,
      regionName,
      city,
      lat,
      lon,
      timezone,
      isp,
      org,
      as,
    } = res;

    bot.sendMessage(
      chatId,
      '*Result*\n' +
        `*Status*: ${status}\n` +
        `*Country*: ${country}\n` +
        `*Country Code*: ${countryCode}\n` +
        `*Region*: ${region}\n` +
        `*Region Name*: ${regionName}\n` +
        `*City*: ${city}\n` +
        `*Locate*: ${lat} ${lon}\n` +
        `*Timezone*: ${timezone}\n` +
        `*Isp*: ${isp}\n` +
        `*Org*: ${org}\n` +
        `*As*: ${as}\n`,
      {
        parse_mode: 'markdown',
      }
    );
  });
};
