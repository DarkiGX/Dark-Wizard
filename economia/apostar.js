let aposta = new Set();
let TempoCollector = 10;
module.exports = {
  async execute(client, message, args, database, mdk) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Prefixo/" +
        message.guild.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefix = body.prefixo;
    let prefixo = `${prefix ? prefix : "d!"}`;

    let regexArray = args[0];
    if (!regexArray || regexArray.length < 1) {
      return message.channel.send({
        embed: {
          color: 3447003,
          timestamp: new Date(),
          title: "Modo de Uso",
          description: prefixo + "apostar @membro `quantidade`"
        }
      });
    }

    if (user.id === message.author.id)
      return message.channel.send("❌ | Você não pode apostar com si mesmo");
    if (user.bot)
      return message.channel.send("❌ | Você não pode apostar com um bot");

    let quantidade = Number(args[1]);
    if (!args[1]) return message.channel.send("Insira uma quantia");

    database
      .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        if (
          isNaN(quantidade) ||
          quantidade <= 0 ||
          quantidade !== Math.trunc(quantidade)
        ) {
          message.channel.send("🔔 | O valor mínimo para aposta é **R$100**");
          return;
        }

        if (snap.val().dinheiro < quantidade) {
          message.channel.send("🔔 | Você não tem valor o suficiente");
          return 0;
        }

        database
          .ref(`Servidores/Banco/${message.guild.id}/${user.id}`)
          .once("value")
          .then(async function(snap) {
            if (quantidade < 100) {
              message.channel.send(
                "🔔 | O valor mínimo para aposta é **R$100**"
              );
              return 0;
            }
            if (snap.val().dinheiro < quantidade) {
              message.channel.send(
                "🔔 | O adversário não tem valor o suficiente"
              );
              return 0;
            }

            message.channel
              .send({
                embed: {
                  color: 3447003,
                  description:
                    user +
                    " você foi desafiado por " +
                    message.author +
                    " para uma aposta valendo **" +
                    require("currency-formatter").format(quantidade, {
                      code: "de-DE",
                      symbol: "R$ ",
                      precision: 0
                    }) +
                    "** \n\n Digite: `sim` para aceitar",
                  footer: {
                    icon_url: message.author.avatarURL,
                    text: `Você tem apenas ${TempoCollector} segundos para responder`
                  }
                }
              })
              .then(async msg => {
                let teste;
                const filter = m =>
                  m.content.toLowerCase() === "sim" && m.author.id === user.id;
                const collector = msg.channel.createMessageCollector(filter, {
                  time: TempoCollector * 1000
                });
                teste = false;
                collector.on("collect", m => {
                  teste = true;

                  if (aposta.has(m.author.id)) {
                    //
                  } else {
                    database
                      .ref(
                        `Servidores/Banco/${message.guild.id}/${message.author.id}`
                      )
                      .once("value")
                      .then(async function(snap) {
                        if (snap.val().dinheiro < quantidade) {
                          message.channel.send(
                            "🔔 | O adversário não tem valor o suficiente"
                          );
                          return 0;
                        }

                        database
                          .ref(
                            `Servidores/Banco/${message.guild.id}/${user.id}`
                          )
                          .once("value")
                          .then(async function(snap) {
                            if (snap.val().dinheiro < quantidade) {
                              message.channel.send(
                                "🔔 |  Você não tem valor o suficiente"
                              );
                              return 0;
                            }

                            database
                              .ref(
                                `Servidores/Banco/${message.guild.id}/${message.author.id}`
                              )
                              .once("value")
                              .then(async function(snap) {
                                database
                                  .ref(
                                    `Servidores/Banco/${message.guild.id}/${message.author.id}`
                                  )
                                  .update({
                                    dinheiro: snap.val().dinheiro - quantidade
                                  });
                                database
                                  .ref(
                                    `Servidores/Banco/${message.guild.id}/${user.id}`
                                  )
                                  .once("value")
                                  .then(async function(snap) {
                                    database
                                      .ref(
                                        `Servidores/Banco/${message.guild.id}/${user.id}`
                                      )
                                      .update({
                                        dinheiro:
                                          snap.val().dinheiro - quantidade
                                      });
                                  });
                              });
                            const v = quantidade * 2;
                            setTimeout(function() {
                              var aposta_random = [
                                message.author.id,
                                user.id,
                                message.author.id,
                                user.id
                              ];

                              let ganhador =
                                aposta_random[
                                  Math.floor(
                                    Math.random() * aposta_random.length
                                  )
                                ];
                              database
                                .ref(
                                  `Servidores/Banco/${message.guild.id}/${ganhador}`
                                )
                                .once("value")
                                .then(async function(snap) {
                                  database
                                    .ref(
                                      `Servidores/Banco/${message.guild.id}/${ganhador}`
                                    )
                                    .update({
                                      dinheiro: snap.val().dinheiro + v
                                    });

                                  message.channel.send({
                                    embed: {
                                      color: 3447003,
                                      title: "Sistema de Aposta",
                                      description:
                                        "💵 | <@" +
                                        ganhador +
                                        "> você ganhou a aposta e faturou **" +
                                        require("currency-formatter").format(
                                          quantidade,
                                          {
                                            code: "de-DE",
                                            symbol: "R$ ",
                                            precision: 0
                                          }
                                        ) +
                                        "**"
                                    }
                                  });
                                });
                            }, 1000);
                          });
                      });
                    aposta.add(m.author.id);
                    setTimeout(() => {
                      aposta.delete(m.author.id);
                    }, TempoCollector * 1000);
                  }
                });
              });
          });
      });
  }
};
