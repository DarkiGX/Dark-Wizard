let Tempo = 60 * 60000;

module.exports = {
  name: "caçar",
  aliases: ["caçar", "cacar", "hunt"],
  async execute(client, message, args, database, mdk) {
    let animais = [
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🐭",
      "🐭",
      "🦁",
      "🐭",
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🐰",
      "🦏",
      "🦏",
      "🦏",
      "🦏",
      "🐭",
      "🐭",
      "🐭",
      "🐭",
      "🐭",
      "🐭",
      "🦁",
      "🦏",
      "🐯",
      "🦏",
      "🦁",
      "🐯",
      "🐒",
      "🐒",
      "🐒",
      "🐒",
      "🐒",
      "🐒",
      "🐒",
      "🐒",
      "🐒"
    ];

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/TempoEconomia/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var TempoCaça;
    if (!body) {
      TempoCaça = 0;
    } else {
      TempoCaça = Number(body.tempocaça);
    }
    //
    const time = require("parse-ms")(Tempo - (Date.now() - TempoCaça));
    if (TempoCaça !== null && Tempo - (Date.now() - TempoCaça) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.minutes}m ${time.seconds}s` +
            " ** para caçar novamente"
        }
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Armas/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    ////

    var Arma;
    if (!body) {
      Arma = 0;
    } else {
      Arma = Number(body.arma);
    }

    var Armacaça;
    if (!body) {
      Armacaça = 0;
    } else {
      Armacaça = Number(body.armacaça);
    }

    if (Armacaça < 1)
      return message.channel.send("❌ | Você não possuí Arma de Caça, use `" + prefixo + "loja Armas` e compre uma Arma de Caça.");

    var Munição;
    if (!body) {
      Munição = 0;
    } else {
      Munição = Number(body.munição);
    }

    if (Munição < 1)
      return message.channel.send("❌ | Você não possuí Bala o Suficiente, use `" + prefixo + "loja Utilidades para comprar.");

    var Vara;
    if (!body) {
      Vara = 0;
    } else {
      Vara = Number(body.vara);
    }

    var Camarao;
    if (!body) {
      Camarao = 0;
    } else {
      Camarao = Number(body.camarao);
    }

    var Posse;
    if (!body) {
      Posse = 0;
    } else {
      Posse = Number(body.portedearma);
    }

    database
      .ref("Servidores/Armas/" + message.guild.id + "/" + message.author.id)
      .set({
        arma: Arma,
        munição: Munição - 1,
        portedearma: Posse,
        armacaça: Armacaça,
        vara: Vara,
        camarao: Camarao
      });
    ////

    const pez = animais[Math.floor(Math.random() * (animais.length - 1) + 1)];
    let valor;
    if (pez === "🦁") valor = 350;
    if (pez === "🐯") valor = 150;
    if (pez === "🦏") valor = 75;
    if (pez === "🐰") valor = 30;
    if (pez === "🐭") valor = 15;
    if (pez === "🐒") valor = 10;
    const mensaje =
      "🏹 | Você saiu pra caçar e capturou um " +
      pez +
      " e faturou `" +
      valor +
      "`Kg de carne.";

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Inventario/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Carne;
    if (!body) {
      Carne = 0;
    } else {
      Carne = Number(body.carne);
    }

    var Peixe;
    if (!body) {
      Peixe = 0;
    } else {
      Peixe = Number(body.peixe);
    }

    database
      .ref(
        "Servidores/Inventario/" + message.guild.id + "/" + message.author.id
      )
      .set({
        carne: Carne + valor,
        peixe: Peixe
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/TempoEconomia/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var TempoCaça;
    if (!body) {
      TempoCaça = 0;
    } else {
      TempoCaça = Number(body.tempocaça);
    }

    var TempoPesca;
    if (!body) {
      TempoPesca = 0;
    } else {
      TempoPesca = Number(body.tempopesca);
    }

    var TempoCrime;
    if (!body) {
      TempoCrime = 0;
    } else {
      TempoCrime = Number(body.tempocrime);
    }

    var TempoRoubar;
    if (!body) {
      TempoRoubar = 0;
    } else {
      TempoRoubar = Number(body.temporoubar);
    }

    var TempoTrabalho;
    if (!body) {
      TempoTrabalho = 0;
    } else {
      TempoTrabalho = Number(body.tempotrabalho);
    }

    database
      .ref(
        "Servidores/TempoEconomia/" + message.guild.id + "/" + message.author.id
      )
      .set({
        tempocaça: (TempoCaça = Date.now()),
        tempopesca: TempoPesca,
        tempocrime: TempoCrime,
        temporoubar: TempoRoubar,
        tempotrabalho: TempoTrabalho
      });

    message.channel.send({
      embed: {
        color: 2447003,
        timestamp: new Date(),
        title: "Caçando...",
        description: mensaje,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
