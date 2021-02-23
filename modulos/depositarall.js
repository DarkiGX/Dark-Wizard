module.exports = {
  name: "depositarall",
  aliases: ["depositarall", "depositall"],
  async execute(client, message, args, database) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var banco;

    if (!body) {
      banco = 0;
    } else {
      banco = Number(body.dindin);
    }

    var dinmão;

    if (!body) {
      dinmão = 0;
    } else {
      dinmão = Number(body.dinheiro);
    }

    if (dinmão < 200) {
      message.channel
        .send("🔔 | O valor mínimo para depósito é **R$200**")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
      return 0;
    }

    if (dinmão < dinmão)
      return message.channel
        .send("🔔 | Você não tem dinheiro o suficiente para depositar")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco + dinmão,
        dinheiro: dinmão - dinmão
      });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Depósito Bancário",
        description: `💵 | Você depositou **${require("currency-formatter").format(
          dinmão,
          { code: "de-DE", symbol: "R$ ", precision: 0 }
        )}** no seu Banco com sucesso`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
