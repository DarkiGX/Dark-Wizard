let Tempo = 60 * 60000;

module.exports = {
  name: "crime",
  aliases: ["crime", "delict"],
  async execute(client, message, args, database, mdk) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Profissão/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Trabalho;
    if (!body) {
      Trabalho = 0;
    } else {
      Trabalho = Number(body.trabalho);
    }

    //19, 20, 21
    if (
      Trabalho === 17 &&
      Trabalho === 18 &&
      Trabalho === 19 &&
      Trabalho === 20
    )
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "❌ | Você não pode entrar para o crime pois tem Cargo Alto no **GOVERNO**"
        }
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

    var TempoCrime;
    if (!body) {
      TempoCrime = 0;
    } else {
      TempoCrime = Number(body.tempocrime);
    }

    const time = require("parse-ms")(Tempo - (Date.now() - TempoCrime));
    if (TempoCrime !== null && Tempo - (Date.now() - TempoCrime) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.minutes}m ${time.seconds}s` +
            " ** para entrar no Crime novamente"
        }
      });
    let Dinheirão = Math.round(Math.random() * 200) + 1000;

    const random_crime = [
        "💵 | Você fez tela fake de FGTS e faturou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você clonou cartão de um Otaku no Discord e ganhou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Te ofereceram uma recompensa para derrubar um servidor do Discord e você ganhou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você aprovou nitro com Iphone e ganhou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você vendeu pack do pé e ganhou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você travou o zap do adm e ganhou" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
    ];

    const random_policia = [
        "💵 | Você foi assaltar um banco com a sua quadrilha mas foi cercado pela policia e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você foi pego pagando de WebBandido(a) no Discord e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você sequestrou a filha do Presidente mas ele descobriu o esconderijo, invadiu o local e você foi pego e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Seu cartão queimou e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você foi scammado e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
        "💵 | Você tentou travar o zap do adm mas ele tava de zap imune, e perdeu" +
        ` **${require("currency-formatter").format(Dinheirão, { code: "de-DE", symbol: "R$ ", precision: 0})}** `,
    ];

    var output = await require("discord-economy").Work(message.author.id, {
      failurerate: 30
    });

    if (output.earned == 0) {
      return database
        .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
        .once("value")
        .then(async function(snap) {
          database
            .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
            .update({
              dinheiro: snap.val().dinheiro - Dinheirão
            });
          message.channel.send({
            embed: {
              color: 3447003,
              title: "Crime",
              description:
                random_policia[
                  Math.floor(Math.random() * random_policia.length)
                ],
              footer: {
                icon_url: message.author.avatarURL,
                text: message.author.tag
              }
            }
          });

          //PONTOS DO CRIME
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
              "Servidores/TempoEconomia/" +
                message.guild.id +
                "/" +
                message.author.id
            )
            .set({
              tempocaça: TempoCaça,
              tempopesca: TempoPesca,
              tempocrime: (TempoCrime = Date.now()),
              temporoubar: TempoRoubar,
              tempotrabalho: TempoTrabalho
            });
        });
    }

    database
      .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        database
          .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
          .update({
            dinheiro: snap.val().dinheiro + Dinheirão
          });

        message.channel.send({
          embed: {
            color: 3447003,
            title: "Crime",
            description:
              random_crime[Math.floor(Math.random() * random_crime.length)],
            footer: {
              icon_url: message.author.avatarURL,
              text: message.author.tag
            }
          }
        });

        //PONTOS DO CRIME
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
            "Servidores/TempoEconomia/" +
              message.guild.id +
              "/" +
              message.author.id
          )
          .set({
            tempocaça: TempoCaça,
            tempopesca: TempoPesca,
            tempocrime: (TempoCrime = Date.now()),
            temporoubar: TempoRoubar,
            tempotrabalho: TempoTrabalho
          });
      });
  }
};
