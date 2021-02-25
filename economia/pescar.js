let Tempo = 60 * 60000;

module.exports = {
  name: "pescar",
  aliases: ["pescar", "to fish"],
  async execute(client, message, args, database, mdk) {
    let peixes = [
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐡",
      "🐡",
      "🐡",
      "🐡",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐡",
      "🐡",
      "🐡",
      "🐡",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐟",
      "🐡",
      "🐡",
      "🐡",
      "🐡",
      "🦈",
      "🐳"
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

    var TempoPesca;
    if (!body) {
      TempoPesca = 0;
    } else {
      TempoPesca = Number(body.tempopesca);
    }

    const time = require("parse-ms")(Tempo - (Date.now() - TempoPesca));
    if (TempoPesca !== null && Tempo - (Date.now() - TempoPesca) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.minutes}m ${time.seconds}s` +
            " ** para pescar novamente"
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

    var Munição;
    if (!body) {
      Munição = 0;
    } else {
      Munição = Number(body.munição);
    }

    var Armacaça;
    if (!body) {
      Armacaça = 0;
    } else {
      Armacaça = Number(body.armacaça);
    }

    var Vara;
    if (!body) {
      Vara = 0;
    } else {
      Vara = Number(body.vara);
    }

    if (Vara < 1)
      return message.channel.send("❌ | Você não possuí Vara de Pescar, use `" + prefixo + "loja utilidades` para comprar uma!");

    var Camarao;
    if (!body) {
      Camarao = 0;
    } else {
      Camarao = Number(body.camarao);
    }

    if (Camarao < 1)
      return message.channel.send("❌ | Você não possuí Camarão o Suficiente para usar de isca, use `" + prefixo + "loja utilidades` para comprar mais!");

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
        munição: Munição,
        portedearma: Posse,
        armacaça: Armacaça,
        vara: Vara,
        camarao: Camarao - 1
      });
    ////

    const pez = peixes[Math.floor(Math.random() * (peixes.length - 1) + 1)];
    let valor;
    if (pez === "🐳") valor = 250;
    if (pez === "🦈") valor = 125;
    if (pez === "🐡") valor = 65;
    if (pez === "🐠") valor = 25;
    if (pez === "🐟") valor = 10;
    const mensaje =
      "🎣 | Você saiu pra pescar e capturou um " +
      pez +
      " e faturou `" +
      valor +
      "KG` de peixe.";

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
        carne: Carne,
        peixe: Peixe + valor
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

    var TempoRoubar;
    if (!body) {
      TempoRoubar = 0;
    } else {
      TempoRoubar = Number(body.temporoubar);
    }

    var TempoCrime;
    if (!body) {
      TempoCrime = 0;
    } else {
      TempoCrime = Number(body.tempocrime);
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
        tempocaça: TempoCaça,
        tempopesca: (TempoPesca = Date.now()),
        tempocrime: TempoCrime,
        temporoubar: TempoRoubar,
        tempotrabalho: TempoTrabalho
      });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Pescando...",
        description: mensaje,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
