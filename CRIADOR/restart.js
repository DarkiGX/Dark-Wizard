const config = require("../config.json");
const emoji = require("../emoji.json");

module.exports = {
  async execute(client, message, args) {
    if (message.author.id !== config.criador)
      return message.channel.send(
        emoji.negativo + " | Este comando é exclusivo do meu criador!"
      );

    if (!args[0])
      return message.channel.send(
        "Modo de Uso: \n\n **restart + `</caminho>` + `</arquivo>`**"
      );
    if (!args[1])
      return message.channel.send(
        "Modo de Uso: \n\n **restart + `</caminho>` + `</arquivo>`**"
      );

    let caminho = args[0];
    let arquivo = args[1];
    delete require.cache[require.resolve(`../${caminho}/${arquivo}.js`)];
    message.channel.send(
      "O comando **" +
        args[1] +
        "** da categoria **" +
        args[0] +
        "** foi reiniciado"
    );
    message.client.commands.delete(arquivo);
    const pull = require(`../${caminho}/${arquivo}.js`);
    message.client.commands.set(arquivo, pull);
  }
};
