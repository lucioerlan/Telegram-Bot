const bot = require('./src/server');

const help = require('./commands/cmd.help');
const echo = require('./commands/cmd.echo');
const cep = require('./commands/cmd.cep');
const cnpj = require('./commands/cmd.cnpj');
const currency = require('./commands/cmd.currency');
const ip = require('./commands/cmd.ip');
const peoples = require('./commands/cmd.peoples');
const plate = require('./commands/cmd.plate');
const andress = require('./commands/cmd.andress');
const join = require('./events/event.join');
const left = require('./events/event.left');

bot.onText(/\/help/, help);
bot.onText(/\/echo (.+)/, echo);
bot.onText(/\/cep (.+)/, cep);
bot.onText(/\/cnpj (.+)/, cnpj);
bot.onText(/\/currency (.+)/, currency);
bot.onText(/\/ip (.+)/, ip);
bot.onText(/\/peoples (.+)/, peoples);
bot.onText(/\/plate (.+)/, plate);
bot.onText(/\/andress (.+)/, andress);

bot.on('new_chat_members', join);
bot.on('left_chat_member', left);
