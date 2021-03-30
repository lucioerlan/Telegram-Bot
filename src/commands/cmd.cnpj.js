const request = require('request');
const bot = require('../config');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  let searchCnpj = match[1];
  const user = `@${msg.from.username}` || msg.from.first_name;
  searchCnpj = searchCnpj.replace(/[^\d]+/g, '');

  bot.sendMessage(chatId, `${user}, Searching CNPJ, please wait...\n\n`);

  request(
    `https://www.receitaws.com.br/v1/cnpj/${searchCnpj}`,
    (error, result) => {
      if (error || result.statusCode !== 200)
        return bot.sendMessage(
          chatId,
          `${user}, ${searchCnpj} Error! ${result.body}`
        );

      const res = JSON.parse(result.body);

      const { text, code } = res.atividade_principal[0];

      const {
        nome,
        data_situacao,
        complemento,
        tipo,
        uf,
        telefone,
        email,
        situacao,
        bairro,
        logradouro,
        numero,
        cep,
        municipio,
        porte,
        abertura,
        natureza_juridica,
        fantasia,
        cnpj,
        status,
        efr,
        motivo_situacao,
        situacao_especial,
        data_situacao_especial,
        capital_social,
      } = res;

      bot.sendMessage(
        chatId,
        '*Result*\n' +
          `*Nome*: ${nome}\n` +
          `*Type*: ${text}\n` +
          `*Code*: ${code}\n` +
          `*Data Situacao*: ${data_situacao}\n` +
          `*Complemento*: ${complemento}\n` +
          `*Tipo*: ${tipo}\n` +
          `*Uf*: ${uf}\n` +
          `*Telefone*: ${telefone}\n` +
          `*E-mail*: ${email}\n` +
          `*Situacao*: ${situacao}\n` +
          `*Bairro*: ${bairro}\n` +
          `*Logradouro*: ${logradouro}\n` +
          `*Numero*: ${numero}\n` +
          `*Cep*: ${cep}\n` +
          `*Municipio*: ${municipio}\n` +
          `*Porte*: ${porte}\n` +
          `*Abertura*: ${abertura}\n` +
          `*Natureza Juridica*: ${natureza_juridica}\n` +
          `*Fantasia*: ${fantasia}\n` +
          `*Cnpj*: ${cnpj}\n` +
          `*Status*: ${status}\n` +
          `*Efr*: ${efr}\n` +
          `*Motivo Situacao*: ${motivo_situacao}\n` +
          `*Situacao Especial*: ${situacao_especial}\n` +
          `*Data Situacao Especial*: ${data_situacao_especial}\n` +
          `*Capital Social*: ${capital_social}\n`,
        {
          parse_mode: 'markdown',
        }
      );
    }
  );
};
