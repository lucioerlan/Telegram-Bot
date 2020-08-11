const bot = require('../src/server');
const request = require('request');

module.exports = async (msg) => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'BTC',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'bitcoin',
            }),
          },
          {
            text: 'ETH',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'ethereum',
            }),
          },

          {
            text: 'XRP',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'ripple',
            }),
          },
          {
            text: 'USDT',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'tether',
            }),
          },

          {
            text: 'BCH',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'bitcoin-cash',
            }),
          },

          {
            text: 'LINK',
            callback_data: JSON.stringify({
              command: 'price',
              base: 'chainlink-cash',
            }),
          },
        ],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, 'Choose base currency', options);

  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const data = JSON.parse(callbackQuery.data);
    const msg = callbackQuery.message;

    const options = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      user: msg.from.username,
    };
    request(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${data.base}`,
      (error, result) => {
        if (error || result.statusCode !== 200)
          return bot.sendMessage(
            options.chat_id,
            `${options.user}, ${data.base} Error! ${result.body}`
          );

        const res = JSON.parse(result.body);

        const {
          id,
          symbol,
          name,
          image,
          current_price,
          market_cap,
          market_cap_rank,
          total_volume,
          high_24h,
          low_24h,
          price_change_24h,
          price_change_percentage_24h,
          market_cap_change_24h,
          market_cap_change_percentage_24h,
          circulating_supply,
          total_supply,
          ath,
          ath_change_percentage,
          ath_date,
          atl,
          atl_change_percentage,
          atl_date,
          roi,
          last_updated,
        } = res[0];

        bot.sendPhoto(options.chat_id, image);
        bot.sendMessage(
          options.chat_id,
          '*Result*\n' +
            `*Id*: ${id}\n` +
            `*Symbol*: ${symbol}\n` +
            `*Name*: ${name}\n` +
            `*Current Price*: ${current_price}\n` +
            `*Market Cap*: ${market_cap}\n` +
            `*Market Cap Rank*: ${market_cap_rank}\n` +
            `*Total Volume*: ${total_volume}\n` +
            `*High 24h*: ${high_24h}\n` +
            `*Low 24h*: ${low_24h}\n` +
            `*Price Change 24h*: ${price_change_24h}\n` +
            `*Price Change Percentage 24h*: ${price_change_percentage_24h}\n` +
            `*Market Cap Change 24h*: ${market_cap_change_24h}\n` +
            `*Market Cap Change Percentage 24h*: ${market_cap_change_percentage_24h}\n` +
            `*Circulating Supply*: ${circulating_supply}\n` +
            `*Total Supply*: ${total_supply}\n` +
            `*Ath*: ${ath}\n` +
            `*Ath Change Percentage*: ${ath_change_percentage}\n` +
            `*Ath Date*: ${ath_date}\n` +
            `*Atl*: ${atl}\n` +
            `*Atl Change Percentage*: ${atl_change_percentage}\n` +
            `*Atl Date*: ${atl_date}\n` +
            `*Roi*: ${roi}\n` +
            `*Last Updated*: ${last_updated}\n\n` +
            '*For more currencies consult us*',
          { parse_mode: 'markdown' }
        );
      }
    );
  });
};
