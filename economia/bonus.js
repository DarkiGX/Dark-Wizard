let Tempo = 1440 * 60000;

module.exports = {
  name: "bonus",
  aliases: ["bonus", "bônus", "daily"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/SlowGlobal/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Bonus;
    if (!body) {
      Bonus = 0;
    } else {
      Bonus = Number(body.slowbonus);
    }

    var Ducketss;
    if (!body) {
      Ducketss = 0;
    } else {
      Ducketss = Number(body.slowduckets);
    }

    database.ref("SlowGlobal/" + message.author.id).set({
      slowbonus: Bonus,
      slowduckets: Ducketss
    });

    const time = require("parse-ms")(Tempo - (Date.now() - Bonus));
    if (Bonus !== null && Tempo - (Date.now() - Bonus) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.hours}h ${time.minutes}m ${time.seconds}s` +
            " ** para coletar o seu bônus novamente"
        }
      });

    let grana = Math.round(Math.random() * 1500) + 5000;

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

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco,
        dinheiro: dinmão + grana
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/SlowGlobal/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Bonus;
    if (!body) {
      Bonus = 0;
    } else {
      Bonus = Number(body.slowbonus);
    }

    var Ducketss;
    if (!body) {
      Ducketss = 0;
    } else {
      Ducketss = Number(body.slowduckets);
    }

    database.ref("SlowGlobal/" + message.author.id).set({
      slowbonus: (Bonus = Date.now()),
      slowduckets: Ducketss
    });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Bônus Diário",
        description:
          "💵 | Você coletou **" +
          require("currency-formatter").format(grana, {
            code: "de-DE",
            symbol: "R$ ",
            precision: 0
          }) +
          "** do seu bônus diário",
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
