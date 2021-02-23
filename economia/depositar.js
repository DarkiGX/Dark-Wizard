module.exports = {
  name: "depositar",
  aliases: ["depositar", "deposit", "dep"],
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
               "d!depositar `quantidade` | " + "ou `d!depositarall` para depositar tudo"
          }
        })
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
    }

    var din = Number(args[0]);
    if (!din) return message.channel.send("Insira uma quantia. E não use vírgulas");
    if (isNaN(din)) return;

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

    if (din < 100) {
      message.channel
        .send("🔔 | O valor mínimo para depósito é **R$ 100**")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));
      return 0;
    }

    if (dinmão < din)
      return message.channel
        .send("🔔 | Você não tem dinheiro o suficiente para depositar")
        .then(m => m.delete(10 * 1000), message.delete(10 * 1000));

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco + din,
        dinheiro: dinmão - din
      });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Depósito Bancário",
        description: `💵 | Você depositou **${require("currency-formatter").format(
          din,
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
