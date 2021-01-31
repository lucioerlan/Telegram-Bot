const bot = require('./src/config');

const help = require('./src/controllers/cmd.help');
const echo = require('./src/controllers/cmd.echo');
const cep = require('./src/controllers/cmd.cep');
const cnpj = require('./src/controllers/cmd.cnpj');
const currency = require('./src/controllers/cmd.currency');
const ip = require('./src/controllers/cmd.ip');
const peoples = require('./src/controllers/cmd.peoples');
const plate = require('./src/controllers/cmd.plate');
const andress = require('./src/controllers/cmd.andress');
const join = require('./src/events/event.join');
const left = require('./src/events/event.left');

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
