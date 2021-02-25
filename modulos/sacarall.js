module.exports = {
  name: "sacarall",
  aliases: ["sacarall", "whitdrawall"],
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

    if (banco < 100) {
      message.channel
        .send("🔔 | O valor mínimo para saque é **R$ 100**")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
      return 0;
    }

    if (banco < banco)
      return message.channel
        .send("🔔 | Você não tem dinheiro o suficiente para sacar")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco - banco,
        dinheiro: dinmão + banco
      });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Saque Bancário",
        description: `💵 | Você sacou **${require("currency-formatter").format(
          banco,
          { code: "de-DE", symbol: "R$ ", precision: 0 }
        )}** do seu Banco com sucesso`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
