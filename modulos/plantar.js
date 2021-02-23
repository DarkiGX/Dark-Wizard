const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍",
  data: "🗓️",
  tempo: "⏱️",
  semente: "🥜",
  um: "1️⃣",
  dois: "2️⃣",
  tres: "3️⃣",
  cadeado: "🔒",
  colher: "🧺",
  tempodelete: 10 * 1000
};

let lote = 15000;

module.exports = {
  name: "plantar",
  aliases: ["plantar"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/Servidores/Prefixo/${message.guild.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var Prefixo = `${body.prefixo ? body.prefixo : "d!"}`;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var lote1;
    if (!body) {
      lote1 = 0;
    } else {
      lote1 = Number(body.lote1);
    }

    var lote2;
    if (!body) {
      lote2 = 0;
    } else {
      lote2 = Number(body.lote2);
    }

    var lote3;
    if (!body) {
      lote3 = 0;
    } else {
      lote3 = Number(body.lote3);
    }

    var semente = body.semente;
    var adubo = body.adubo;

    message.channel
      .send({
        embed: {
          color: 3447003,
          title: "Colheita Feliz",
          description:
            "Reaja com o número do Lote que deseja plantar\n\n" +
            `${lote1 ? e.um + " - Lote 1" : e.um + " - Lote 1"} \n` +
            `${
              lote2
                ? e.dois + " - Lote 2"
                : e.cadeado + " - Lote 2 | R$ " + lote + " para desbloquear. Desbloqueie em `d!loja maconha`."
            } \n` +
            `${
              lote3
                ? e.tres + " - Lote 3"
                : e.cadeado + " - Lote 3 | R$ " + lote + " para desbloquear. Desbloqueie em `d!loja maconha`."
            }`
        }
      })
      .then(async msg => {
        await msg.react(e.um);
        await msg.react(e.dois);
        await msg.react(e.tres);
        await msg.react(e.negativo);

        var emoji;
        const collector = msg.createReactionCollector(
          (r, u) => u.id == message.author.id
        );

        collector.on("collect", async r => {
          if (r.emoji.id) emoji = r.emoji.id;
          else emoji = r.emoji.name;

          if (emoji === e.um) {
            msg.delete();
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;

            var lote1;
            if (!body) {
              lote1 = 0;
            } else {
              lote1 = Number(body.lote1);
            }

            if (lote1 > 1)
              return message.channel.send({
                embed: {
                   color: 3447003,
                  title: message.author.tag,
                  description:
                    e.tempo +
                    " | esse lote esta em progresso, digite: `" +
                    Prefixo +
                    "plantação` para verificar o status."
                }
              });

            var lote2;
            if (!body) {
              lote2 = 0;
            } else {
              lote2 = Number(body.lote2);
            }

            var lote3;
            if (!body) {
              lote3 = 0;
            } else {
              lote3 = Number(body.lote3);
            }

            var adubo;
            if (!body) {
              adubo = 0;
            } else {
              adubo = Number(body.adubo);
            }

            var semente;
            if (!body) {
              semente = 0;
            } else {
              semente = Number(body.semente);
            }

            if (semente < 3)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.negativo + " | você não possui sementes o sucifiente, use `d!loja maconha` para comprar mais!"
                }
              });

            var maconha;
            if (!body) {
              maconha = 0;
            } else {
              maconha = Number(body.maconha);
            }

            database
              .ref(
                "Servidores/Plantação/" +
                  message.guild.id +
                  "/" +
                  message.author.id
              )
              .set({
                ID: message.author.id,
                lote1: (lote1 = Date.now()),
                lote2: lote2,
                lote3: lote3,
                adubo: adubo,
                maconha: maconha,
                semente: semente - 3
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Plantando",
                description:
                  e.semente +
                  " | " +
                  message.author +
                  " você plantou `3` sementes no " +
                  e.um +
                  " lote com sucesso,\nverifique o progresso usando o comando **" +
                  Prefixo +
                  "plantação**"
              }
            });
          }
          //
          if (emoji === e.dois) {
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;

            var lote1;
            if (!body) {
              lote1 = 0;
            } else {
              lote1 = Number(body.lote1);
            }

            var lote2;
            if (!body) {
              lote2 = 0;
            } else {
              lote2 = Number(body.lote2);
            }

            if (lote2 === 0)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.cadeado + " | você ainda não desbloqueou esse Lote, use `d!loja maconha` para compra-lo"
                }
              });

            if (lote2 > 1)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.tempo +
                    " | esse lote esta em progresso, digite: **" +
                    Prefixo +
                    "plantação** para verificar o status."
                }
              });

            var lote3;
            if (!body) {
              lote3 = 0;
            } else {
              lote3 = Number(body.lote3);
            }

            var adubo;
            if (!body) {
              adubo = 0;
            } else {
              adubo = Number(body.adubo);
            }

            var semente;
            if (!body) {
              semente = 0;
            } else {
              semente = Number(body.semente);
            }

            if (semente < 3)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.negativo + " | você não possui sementes o sucifiente, use `d!loja maconha` para adquirir mais!"
                }
              });

            var maconha;
            if (!body) {
              maconha = 0;
            } else {
              maconha = Number(body.maconha);
            }

            database
              .ref(
                "Servidores/Plantação/" +
                  message.guild.id +
                  "/" +
                  message.author.id
              )
              .set({
                ID: message.author.id,
                lote1: lote1,
                lote2: (lote2 = Date.now()),
                lote3: lote3,
                adubo: adubo,
                maconha: maconha,
                semente: semente - 3
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Plantando",
                description:
                  e.semente +
                  " | " +
                  message.author +
                  " você plantou `3` sementes no " +
                  e.dois +
                  " lote com sucesso,\nverifique o progresso usando o comando `" +
                  Prefixo +
                  "plantação`."
              }
            });
          }
          //
          if (emoji === e.tres) {
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;

            var lote1;
            if (!body) {
              lote1 = 0;
            } else {
              lote1 = Number(body.lote1);
            }

            var lote2;
            if (!body) {
              lote2 = 0;
            } else {
              lote2 = Number(body.lote2);
            }

            var lote3;
            if (!body) {
              lote3 = 0;
            } else {
              lote3 = Number(body.lote3);
            }

            if (lote3 === 0)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.cadeado + " | você ainda não desbloqueou esse Lote, use `d!loja maconha` para adquirir!"
                }
              });
            if (lote3 > 1)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.tempo +
                    " | esse lote esta em progresso, digite: `" +
                    Prefixo +
                    "plantação` para verificar o status."
                }
              });

            var adubo;
            if (!body) {
              adubo = 0;
            } else {
              adubo = Number(body.adubo);
            }

            var semente;
            if (!body) {
              semente = 0;
            } else {
              semente = Number(body.semente);
            }

            if (semente < 3)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    e.negativo + " | você não possui sementes o sucifiente, use `d!loja maconha` para comprar mais!"
                }
              });

            var maconha;
            if (!body) {
              maconha = 0;
            } else {
              maconha = Number(body.maconha);
            }

            database
              .ref(
                "Servidores/Plantação/" +
                  message.guild.id +
                  "/" +
                  message.author.id
              )
              .set({
                ID: message.author.id,
                lote1: lote1,
                lote2: lote2,
                lote3: (lote3 = Date.now()),
                adubo: adubo,
                maconha: maconha,
                semente: semente - 3
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Plantando",
                description:
                  e.semente +
                  " | " +
                  message.author +
                  " você plantou `3` sementes no " +
                  e.tres +
                  " lote com sucesso,\nverifique o progresso usando o comando `" +
                  Prefixo +
                  "plantação`"
              }
            });
          }

          if (emoji === e.negativo) {
            msg.delete();
            message.channel.send({
              embed: {
                color: 3447003,
                description:
                  e.negativo + ` | O comando foi cancelado com sucesso!`
              }
            });
          }
        });
      });
  }
};
