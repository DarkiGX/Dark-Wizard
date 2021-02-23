const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍"
};

module.exports = {
  name: "casar",
  aliases: ["casar", "marry"],
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

    let bmember =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!bmember)
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            e.negativo +
            " | " +
            message.author +
            ", você deve mencionar um usuário"
        }
      });

    if (bmember.id === message.author.id)
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            e.negativo +
            " | " +
            message.author +
            ", você não pode casar com si mesmo"
        }
      });

    if (user.bot)
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            e.negativo +
            " | " +
            message.author +
            ", você não pode casar com um Bot"
        }
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Casamento/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var casado = body.casado;

    if (casado > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            e.aviso +
            ` | ${message.author}, você já está casado com <@${casado}>\n${e.seta1} | **Digite:** ${prefixo}divorciar para ficar solteiro(a) novamente`
        }
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Casamento/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var CAsado = body.casado;

    if (CAsado > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            e.aviso + ` | ${bmember} já está casado(a) com <@${CAsado}>`
        }
      });

    message.channel
      .send({
        embed: {
          color: 3447003,
          timestamp: new Date(),
          title: e.anel + " | Pedido de Casamento",
          description: `**${message.author} pediu ${bmember.user} em Casamento, quer Casar comigo ?**\n\n ${e.positivo} \`Sim\`\n${e.negativo}\`Não\``,
          thumbnail: {
            url: "https://image.flaticon.com/icons/png/512/868/868008.png"
          }
        }
      })
      .then(async msg => {
        await msg.react(e.positivo);
        await msg.react(e.negativo);

        var emoji;
        const collector = msg.createReactionCollector(
          (r, u) => u.id == user.id
        );

        collector.on("collect", async r => {
          if (r.emoji.id) emoji = r.emoji.id;
          else emoji = r.emoji.name;

          if (emoji === e.positivo) {
            msg.delete()
            //
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/Servidores/Casamento/" +
                user.id +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
            var CAsado = body.casado;

            if (CAsado > 0)
              return message.channel.send({
                embed: {
                  description:
                    e.aviso +
                    ` | ${message.author}, você já está casado(a) com <@${CAsado}>`
                }
              });
            //
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/Servidores/Casamento/" +
                message.author.id +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
            var CAsado = body.casado;

            if (CAsado > 0)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  description:
                    e.aviso +
                    ` | ${message.author}, já está casado(a) com <@${CAsado}>, vai ficar sem cabelo.`
                }
              });

            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/Servidores/Casamento/" +
                user.id +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
            var CAsadO = body.casado;

            if (CAsado > 0)
              return message.channel.send({
                embed: {
                  color: 3447003,
                  description:
                    e.aviso + ` | ${CAsado}, já está casado(a) com <@${CAsadO}>, vai ficar sem cabelo`
                }
              });

            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/Servidores/Casamento/" +
                user.id +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
            var Casado = body.casado;
            var DataCasamento = body.dataCasamento;
            var datanow = body.datanow;

            database.ref(`Servidores/Casamento/${user.id}`).set({
              casado: (Casado = message.author.id),
              dataCasamento: (DataCasamento = require("moment")(
                Date.now()
              ).format("DD-MM-YYYY")),
              datanow: (datanow = Date.now())
            });

            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/Servidores/Casamento/" +
                message.author.id +
                ".json"
            );

            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
            var casado = body.casado;
            var dataCasamento = body.dataCasamento;
            var datanow = body.datanow;

            database.ref(`Servidores/Casamento/${message.author.id}`).set({
              casado: (casado = user.id),
              dataCasamento: (dataCasamento = require("moment")(
                Date.now()
              ).format("DD-MM-YYYY")),
              datanow: (datanow = Date.now())
            });

            message.channel
              .send({
                embed: {
                  color: 3447003,
                  description:
                    e.positivo +
                    ` | O usuário ${bmember.user} aceitou o pedido de casamento de ${message.author}, felicidades ao casal!`
                }
              })
              .then(async msg => {
                setTimeout(() => {
                  msg.edit({
                    embed: {
                      color: 344703,
                      description: `**${bmember.user} & ${message.author}**, atualizaram o status de relacionamento para **Casados**`
                    }
                  });
                }, 2500);
              });
            }

          //
          if (emoji === e.negativo) {
            msg.delete()
            message.channel.send({
              embed: {
                color: 3447003,
                description:
                  e.negativo +
                  ` | O usuário ${bmember.user} recusou o pedido de casamento de ${message.author}...\n||se precisar um abraço estou aqui ${message.author}, fica triste não|| `
              }
            });
          }
        });
      });
  }
};
