module.exports = {
  name: "transferirall",
  aliases: ["transferirall", "transferall", "tranferir all"],
  async execute(client, message, args, database) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    if (!args[0]) return message.channel.send("🔔 | mencione um membro");
    if (user.id === message.author.id)
      return message.channel.send(
        "❌ | Você não pode transferir para si mesmo"
      );
    if (user.bot)
      return message.channel.send("❌ | Você não pode transferir para um bot");

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

    if (dinmão < 500) {
      message.channel
        .send("🔔 | O valor mínimo para transferencia é **R$ 500**")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
      return 0;
    }

    if (dinmão < dinmão)
      return message.channel
        .send("🔔 | Você não tem dinheiro o suficiente para transferir")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));

    let imposto = Math.round(Math.random() * Number(dinmão)) % 666;
    let teste = imposto;
    let qtd = dinmão - teste;
    let total = dinmão;

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco,
        dinheiro: dinmão - dinmão
      });

    //=//

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        user.id +
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

    database.ref("Servidores/Banco/" + message.guild.id + "/" + user.id).set({
      dindin: banco,
      dinheiro: dinmão + qtd
    });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Transferência Bancária",
        description:
          `💵 | ${
            message.author
          } fez uma transferência de **${require("currency-formatter").format(
            total,
            { code: "de-DE", symbol: "R$ ", precision: 0 }
          )}** ` +
          "(`com imposto de " +
          `${require("currency-formatter").format(teste, {
            code: "de-DE",
            symbol: "R$ ",
            precision: 0
          })}` +
          "`)" +
          ` para ${user} que recebeu **${require("currency-formatter").format(
            qtd,
            { code: "de-DE", symbol: "R$ ", precision: 0 }
          )}**`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
