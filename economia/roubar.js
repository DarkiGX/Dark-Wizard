const ms = require("parse-ms");
const snekfetch = require("snekfetch");
const emoji = require("../emoji.json");
const Firebase = require("../firebase.json");
const config = require("../config.json");
const ant = require("../antiroubo.json")

let Tempo = 60 * 60000;

module.exports = {
  name: "roubar",
  aliases: ["roubar", "assaltar", "assault", "steal"],
  async execute(client, message, args, database) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    }

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Profissão/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var PRofissão = body.emprego;
    if (
      PRofissão === 17 &&
      PRofissão === 18 &&
      PRofissão === 19 &&
      PRofissão === 20
    )
      return message.channel.send({
        embed: {
          color: 800000,
          title: message.author.tag,
          description:
            emoji.negativo +
            " | Você não pode roubar, pois tem Cargo Alto no **GOVERNO**"
        }
      });
    ////

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
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

    if (Arma < 1)
      return message.channel.send(
        emoji.negativo + " | Você precisa de uma arma para roubar, use `d!loja armas` para obter uma!"
      );
    if (Munição < 1)
      return message.channel.send(
        emoji.negativo +
          " | Você não possuí Munição o suficiente para realizar um roubo. use `d!loja utilidades` para obter mais munição!"
      );

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/TempoEconomia/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var TempoRoubar;
    if (!body) {
      TempoRoubar = 0;
    } else {
      TempoRoubar = Number(body.temporoubar);
    }

    const time = ms(Tempo - (Date.now() - TempoRoubar));
    if (TempoRoubar !== null && Tempo - (Date.now() - TempoRoubar) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "🚔 **|** Você está escondido da polícia. Aguarde **" +
            `${time.minutes}m ${time.seconds}s` +
            " ** para roubar novamente"
        }
      });

    if (!user)
      return message.channel.send(
        emoji.aviso + " | Você deve mencionar um usuário para roubar"
      );

    if (user.id === message.author.id)
      return message.channel.send(
        emoji.negativo + " | Você não pode roubar a si mesmo"
      );

    if (user.id === config.criador)
      return message.channel.send(
        emoji.negativo +
          " | " +
          message.author +
          " você não pode roubar o meu criador, um mago protege seu mestre 🧙‍♂️"
      );
    const criador = client.users.get(require("../config.json").criador);
    var { body } = await snekfetch.get(
      Firebase.databaseURL + "/ANTIROUBO/" + user.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var AntiRoubo = body.antiroubo;

    if (user.id === ant.antiroubo)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: "Sistema de Proteção Anti-Roubo",
          description:
            emoji.negativo +
            " | " +
            user +
            " não pode ser roubado pois possui **Proteção Anti-Roubo**, entre em contato com " + criador.tag + " para ter proteção anti roubo."
        }
      });

    ////

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var dinheiro;
    if (!body) {
      dinheiro = 0;
    } else {
      dinheiro = Number(body.dinheiro);
    }

    let Dinheirão = Math.round(Math.random() * dinheiro);
    if (dinheiro < 1)
      return message.channel.send(
        emoji.negativo + " | O usuário não tem dinheiro para você roubar"
      );

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
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

    if (Arma === 1) Arma = 1; //15% de chance de Roubo
    if (Arma === 2) Arma = 2; //35% de chance de Roubo
    if (Arma === 3) Arma = 3; //60% de chance de Roubo
    if (Arma === 4) Arma = 4; //85% de canche de Roubo

    var output = Arma[Math.floor(Math.random() * Arma.length)];

    if (output == 0) {
      return;
      var { body } = await snekfetch.get(
        Firebase.databaseURL +
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
          "Servidores/TempoEconomia/" +
            message.guild.id +
            "/" +
            message.author.id
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
          timestamp: new Date(),
          title: "Roubo",
          description: `Você deu voz de Assalto para o usuário <@${user.id}> mas ele conseguiu fugir`,
          footer: {
            icon_url: message.author.avatarURL,
            text: message.author.tag
          }
        }
      });
    }
    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var dinheiro;
    if (!body) {
      dinheiro = 0;
    } else {
      dinheiro = Number(body.dinheiro);
    }

    var banco;
    if (!body) {
      banco = 0;
    } else {
      banco = Number(body.dindin);
    }

    let Dinheirãoo = Math.round(Math.random() * dinheiro);
    if (dinheiro < 1)
      return message.channel.send(
        emoji.negativo + " | O usuário não tem dinheiro para ser roubado"
      );

    database.ref(`Servidores/Banco/${message.guild.id}/${user.id}`).set({
      dindin: banco,
      dinheiro: dinheiro - Dinheirãoo
    });

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var dinheiro;
    if (!body) {
      dinheiro = 0;
    } else {
      dinheiro = Number(body.dinheiro);
    }

    var banco;
    if (!body) {
      banco = 0;
    } else {
      banco = Number(body.dindin);
    }

    database
      .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
      .set({
        dindin: banco,
        dinheiro: dinheiro + Dinheirãoo
      });

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
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
    //////////////////////////
    var { body } = await snekfetch.get(
      Firebase.databaseURL +
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
        tempocaça: TempoCaça,
        tempopesca: TempoPesca,
        tempocrime: TempoCrime,
        temporoubar: (TempoRoubar = Date.now()),
        tempotrabalho: TempoTrabalho
      });
    /*
    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Ranks/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Roubos;
    if (!body) {
      Roubos = 0;
    } else {
      Roubos = Number(body.roubos);
    }

    database
      .ref("Servidores/Ranks/" + message.guild.id + "/" + message.author.id)
      .set({
        roubos: Roubos + Dinheirãoo
      });
    /*
    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Prisão/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Prender;
    if (!body) {
      Prender = 0;
    } else {
      Prender = Number(body.tempoprender);
    }

    var Preso;
    if (!body) {
      Preso = 0;
    } else {
      Preso = Number(body.tempopreso);
    }

    database
      .ref("Servidores/Prisão/" + message.guild.id + "/" + message.author.id)
      .set({
        tempopreso: Preso,
        tempoprender: (Prender = Date.now())
      });
*/
    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Roubo",
        description:
          emoji.dinheiro +
          ` | Você roubou **${require("currency-formatter").format(Dinheirãoo, {
            code: "de-DE",
            symbol: "R$ ",
            precision: 0
          })}** do usuário <@${user.id}>`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });
  }
};
