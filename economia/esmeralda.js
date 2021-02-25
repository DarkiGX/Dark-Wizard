let Tempo = 1440 * 60000; //24 horas
const suportediana = "802289502563205140";
module.exports = {
  name: "esmeralda",
  aliases: ["esmeralda", "esmeraldas"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/SlowGlobal/" +
        message.author.id +
        ".json",
        require("../firebase.json").databaseURL +
        `/Servidores/Prefixo/${message.guild.id}` +
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

    const time = require("parse-ms")(Tempo - (Date.now() - Ducketss));
    if (Ducketss !== null && Tempo - (Date.now() - Ducketss) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.hours}h ${time.minutes}m ${time.seconds}s` +
            " ** para coletar suas esmeraldas diárias novamente"
        }
      });

    let grana = Math.round(Math.random() * 1500) + 5000;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Duckets/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    let Duckets = 2;
    if (message.guild.id === suportediana) Duckets = 4;

    var duckets;
    if (!body) {
      duckets = 0;
    } else {
      duckets = Number(body.duckets);
    }

    database.ref("Duckets/" + message.author.id).set({
      duckets: duckets + Duckets
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
      slowbonus: Bonus,
      slowduckets: (Ducketss = Date.now())
    });

    if (message.guild.id !== suportediana)
      return message.channel.send(message.author,{
        embed: {
          color: 3684413,
          timestamp: new Date(),
          title: "Esmeraldas",
          description:
            "Você coletou **" +
            Duckets +
            "** Esmeraldas diária \n\n " +
            " Ganhe o dobro de Esmeraldas ao executar o comando no servidor de suporte **[Clique aqui para entrar](https://discord.gg/" +
            require("../config.json").suporte +
            ")**",
          footer: {
            icon_url: message.author.avatarURL,
            text: message.author.tag
          },
          thumbnail: {
            url: "https://media.discordapp.net/attachments/796771511553097738/813437718338994186/5a39eb0e3a9663.138552551513745166241223.png?width=605&height=473"
          }
        }
      });

    message.channel.send({
      embed: {
        color: 3684413,
        timestamp: new Date(),
        title: "Esmeraldas",
        description: "Você coletou **" + Duckets + "** Esmeraldas diária! Você ganharia 2, mas ganhou em dobro por usar o comando no servidor de suporte.",
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        },
        thumbnail: {
          url: "https://media.discordapp.net/attachments/796771511553097738/813437718338994186/5a39eb0e3a9663.138552551513745166241223.png?width=605&height=473"
        }
      }
    });
  }
};
