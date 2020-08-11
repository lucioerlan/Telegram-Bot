const bot = require('../src/server');
const request = require('request');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const searchPlate = match[1];
  const user = '@' + msg.from.username || msg.from.first_name;

  console.log(searchPlate);
  bot.sendMessage(chatId, `${user}, Searching Plate, please wait...\n\n`);

  let options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url: `https://apicarros.com/v1/consulta/${searchPlate}/json`,
    insecure: true,
    rejectUnauthorized: false,
  };

  request(options, (error, result) => {
    if (error || result.statusCode !== 200)
      return bot.sendMessage(
        chatId,
        `${user}, ${searchPlate} Error! ${result.body}`
      );

    const res = JSON.parse(result.body);

    const {
      ano,
      anoModelo,
      chassi,
      codigoRetorno,
      codigoSituacao,
      cor,
      data,
      dataAtualizacaoAlarme,
      dataAtualizacaoCaracteristicasVeiculo,
      dataAtualizacaoRouboFurto,
      marca,
      modelo,
      municipio,
      placa,
      situacao,
      uf,
    } = res;

    bot.sendMessage(
      chatId,
      '[Result]\n' +
        `Ano: ${ano}\n` +
        `Ano Modelo: ${anoModelo}\n` +
        `Chassi: ${chassi}\n` +
        `Codigo Retorno: ${codigoRetorno}\n` +
        `Codigo Situacao: ${codigoSituacao}\n` +
        `Cor: ${cor}\n` +
        `Data: ${data}\n` +
        `Data Atualizacao Alarme: ${dataAtualizacaoAlarme}\n` +
        `Data Atualizacao Caracteristicas Veiculo: ${dataAtualizacaoCaracteristicasVeiculo}\n` +
        `Data Atualizacao Roubo Furto: ${dataAtualizacaoRouboFurto}\n` +
        `Marca: ${marca}\n` +
        `Modelo: ${modelo}\n` +
        `Placa: ${placa}\n` +
        `Situacao: ${situacao}\n` +
        `Municipio: ${municipio}\n` +
        `Uf: ${uf}\n`
    );
  });
};
