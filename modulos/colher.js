const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍",
  data: "🗓️",
  tempo: "⏱️",
  um: "1️⃣",
  dois: "2️⃣",
  tres: "3️⃣",
  todas: "🔢",
  cadeado: "🔒",
  colher: "🧺",
  tempodelete: 10 * 1000
};

let Tempo = 180 * 60000;
let lote = 15000;

module.exports = {
  name: "colher",
  aliases: ["colher"],
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
            e.seta1 +
            " | Escolha o Lote que deseja colher\n\n" +
            `${lote1 ? e.um + " - Lote 1" : e.um + " - Lote 1"} \n` +
            `${
              lote2
                ? e.dois + " - Lote 2"
                : e.cadeado + " - Lote 2 | R$ " + lote + " para desbloquear"
            } \n` +
            `${
              lote3
                ? e.tres + " - Lote 3"
                : e.cadeado + " - Lote 3 | R$ " + lote + " para desbloquear"
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

            if (lote1 < 6)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

            const time1 = lote1 !== null && Tempo - (Date.now() - lote1) > 0;
            if (time1 !== false)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

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
                lote1: (lote1 = 1),
                lote2: lote2,
                lote3: lote3,
                adubo: adubo,
                maconha: maconha + 5,
                semente: semente
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Colhendo...",
                description:
                  e.colher +
                  " | " +
                  message.author +
                  " você colheu o seu lote a ganhou `5KG` de Maconha"
              }
            });
          }
          //
          if (emoji === e.dois) {
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

            var lote2;
            if (!body) {
              lote2 = 0;
            } else {
              lote2 = Number(body.lote2);
            }

            if (lote2 < 6)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

            const time1 = lote2 !== null && Tempo - (Date.now() - lote2) > 0;
            if (time1 !== false)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

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
                lote2: (lote2 = 1),
                lote3: lote3,
                adubo: adubo,
                maconha: maconha + 5,
                semente: semente
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Colhendo...",
                description:
                  e.colher +
                  " | " +
                  message.author +
                  " você colheu o seu lote a ganhou `5KG` de Maconha"
              }
            });
          }
          //
          if (emoji === e.tres) {
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

            if (lote3 < 6)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

            const time1 = lote3 !== null && Tempo - (Date.now() - lote3) > 0;
            if (time1 !== false)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

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
                lote3: (lote3 = 1),
                adubo: adubo,
                maconha: maconha + 5,
                semente: semente
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Colhendo...",
                description:
                  e.colher +
                  " | " +
                  message.author +
                  " você colheu o seu lote a ganhou `5KG` de Maconha"
              }
            });
          }
          //
          if (emoji === e.todas) {
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

            var maconha;
            if (!body) {
              maconha = 0;
            } else {
              maconha = Number(body.maconha);
            }

            let sla = 0;
            let sla2 = 0;
            let sla3 = 0;
            if (lote1 < 6) return (sla = 1);
            if (lote2 < 6) return (sla2 = 1);
            if (lote3 < 6) return (sla3 = 1);

            const time1 = lote1 !== null && Tempo - (Date.now() - lote1) > 0;
            if (time1 !== false) return (sla = 1);
            const time2 = lote2 !== null && Tempo - (Date.now() - lote2) > 0;
            if (time2 !== false) return (sla2 = 1);
            const time3 = lote3 !== null && Tempo - (Date.now() - lote3) > 0;
            if (time3 !== false) return (sla3 = 1);

            let Lote1 = 0;
            let Lote2 = 0;
            let Lote3 = 0;
            if (lote1 > 666) Lote1 = 1;
            if (lote2 > 666) Lote2 = 1;
            if (lote3 > 666) Lote3 = 1;
            let lotes = Lote1 + Lote2 + Lote3;
            let lotesppp = sla - sla2 - sla3;
            let TOTAL = lotesppp + lotes;
            let Maconha = TOTAL * 5;

            if (lotesppp < 1)
              return message.channel
                .send({
                  embed: {
                    color: 3447003,
                    title: message.author.tag,
                    description:
                      e.negativo +
                      " | você não possui nada para colher neste Lote"
                  }
                })
                .then(msg => msg.delete(e.tempodelete));

            database
              .ref(
                "Servidores/Plantação/" +
                  message.guild.id +
                  "/" +
                  message.author.id
              )
              .set({
                ID: message.author.id,
                lote1: lote1 - Lote1,
                lote2: lote2 - Lote2,
                lote3: lote3 - Lote3,
                adubo: adubo,
                maconha: maconha + Maconha,
                semente: semente
              });

            message.channel.send({
              embed: {
                color: 3447003,
                title: "Colhendo...",
                description:
                  e.colher +
                  " | " +
                  message.author +
                  " você colheu " +
                  TOTAL +
                  "lotes e ganhou `" +
                  Maconha +
                  "KG` de Maconha"
              }
            });
          }

          if (emoji === e.negativo) {
            msg.delete();
            message.channel.send({
              embed: {
                color: 3447003,
                description:
                  e.negativo + ` | O comando foi cancelado com sucesso`
              }
            });
          }
        });
      });
  }
};
