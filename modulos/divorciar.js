const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍",
  divorce: "💔"
};

module.exports = {
  name: "divorciar",
  aliases: ["divorciar", "divorce", "divorcio"],
  async execute(client, message, args, database, mdk) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    let bmember =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    database
      .ref(`Servidores/Casamento/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        if (snap.val() == null)
          return message.channel.send({
            embed: {
              color: 3447003,
              title: message.author.tag,
              description: e.negativo + ` | você não está casado(a)`
            }
          });
        if (snap.val().casado < 1)
          return message.channel.send({
            embed: {
              color: 3447003,
              title: message.author.tag,
              description: e.negativo + ` | você não está casado(a)`
            }
          });

        message.channel
          .send({
            embed: {
              color: 3447003,
              timestamp: new Date(),
              title: e.divorce + " | Divorciando",
              description: `${message.author} você fez o pedido de divórcio. \n\n ${e.positivo} \`aceitar\`\n${e.negativo}\`recusar\``
            }
          })
          .then(async msg => {
            await msg.react(e.positivo);
            await msg.react(e.negativo);

            var emoji;
            const collector = msg.createReactionCollector(
              (r, u) => u.id == message.author.id
            );

            collector.on("collect", async r => {
              if (r.emoji.id) emoji = r.emoji.id;
              else emoji = r.emoji.name;

              if (emoji === e.positivo) {
                msg.delete();
                database
                  .ref(`Servidores/Casamento/${message.author.id}`)
                  .once("value")
                  .then(async function(snap) {
                    let casado = snap.val().casado;

                    database
                      .ref(`Servidores/Casamento/${message.author.id}`)
                      .update({
                        casado: (snap.val().casado = 0),
                        dataCasamento: (snap.val().dataCasamento = 0)
                      });

                    database
                      .ref(`Servidores/Casamento/${casado}`)
                      .once("value")
                      .then(async function(snap) {
                        database.ref(`Servidores/Casamento/${casado}`).update({
                          casado: (snap.val().casado = 0),
                          dataCasamento: (snap.val().dataCasamento = 0)
                        });

                        message.channel.send({
                          embed: {
                            color: 3447003,
                            description:
                              e.positivo +
                              " | " +
                              message.author +
                              " você fez o seu divórcio com sucesso"
                          }
                        });
                      });
                  });
              }

              if (emoji === e.negativo) {
                msg.delete();
                message.channel.send({
                  embed: {
                    color: 3447003,
                    description:
                      e.negativo + ` | O divórcio foi cancelado com sucesso`
                  }
                });
              }
            });
          });
      });
  }
};
