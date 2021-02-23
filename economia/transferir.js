module.exports = {
  name: "transferir",
  aliases: ["transferir", "transfer"],
  async execute(client, message, args, database) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Configuração/" +
        message.guild.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefixo = body.setprefix;

    let regexArray = args[0];
    if (!regexArray || regexArray.length < 1) {
      return message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Modo de Uso",
            description:
              prefixo +
              "transferir `@membro` `quantidade` | " +
              prefixo +
              "transferirall `@membro`"
          }
        })
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
    }

    var din = Number(args[1]);

    if (isNaN(din) || din <= 0 || din !== Math.trunc(din)) {
      message.channel.send("Insira uma quantia");
      return;
    }

    if (user.id === message.author.id)
      return message.channel.send(
        "❌ | Você não pode transferir para si mesmo"
      );
    if (user.bot)
      return message.channel.send(
        "❌ | Você não pode transferir para um bot"
      );

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

    if (din < 200) {
      message.channel
        .send("🔔 | O valor mínimo para transferencia é **R$200**")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
      return 0;
    }

    if (dinmão < din)
      return message.channel
        .send(
          "🔔 | Você não tem dinheiro o suficiente para transferir"
        )
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));

    let imposto = Math.round(Math.random() * Number(din)) % 666;
    let teste = imposto;
    let qtd = din - teste;

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco,
        dinheiro: dinmão - din
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
          `💵 | ${message.author} fez uma transferência de **${require("currency-formatter").format(din, { code: "de-DE", symbol: "R$ ", precision: 0})}** ` +
          "(`com imposto de " +
          `${require("currency-formatter").format(teste, { code: "de-DE", symbol: "R$ ", precision: 0})}` +
          "`)" +
          ` para ${user} que recebeu **${require("currency-formatter").format(qtd, { code: "de-DE", symbol: "R$ ", precision: 0})}**`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
  