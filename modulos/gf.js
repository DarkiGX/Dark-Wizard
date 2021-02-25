const ms = require("parse-ms");
const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍",
  dinheiro: "💸",
  tempo: "🕛",
  tempodelete: 10 * 1000
};

let Tempo = 30 * 60000;

module.exports = {
  name: "gf",
  aliases: ["gozofone", "gf"],
  async execute(client, message, args, database) {
    database
      .ref(`Servidores/Cooldown/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        var { body } = await require("snekfetch").get(
          require("../firebase.json").databaseURL +
            "/Servidores/Cooldown/" +
            message.author.id +
            ".json"
        );

        if (body === null) body = "undefined";
        if (body === "undefined") body = 0;
        var prostituir = body.prostituir;
        if (prostituir !== null && Tempo - (Date.now() - prostituir) > 0) {
          const time = ms(Tempo - (Date.now() - prostituir));

          message.channel.send({
            embed: {
              color: 3447003,
              title: message.author.tag,
              description:
                e.tempo +
                " | Aguarde **" +
                `${time.minutes}m ${time.seconds}s` +
                " ** para fazer GF novamente"
            }
          });
        } else {
          let Dinheirão = Math.round(Math.random() * 200) + 1000;

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
          const time = require("parse-ms")(Date.now() - datanow);
          let Casado = client.users.get(casado);

          if (casado < 1)
            return message.channel.send({
              embed: {
                color: 3447003,
                title: message.author.tag,
                description:
                  e.negativo + ` | você precisa estar casado(a) para fazer gf.`
              }
            });

          const random_prostituir = [
            "😈 | Você fez GF com <@" +
              Casado.id +
              "> e ganhou" +
              ` **R$${Dinheirão}** `
          ];

          var { body } = await require("snekfetch").get(
            require("../firebase.json").databaseURL +
              "/Servidores/Cooldown/" +
              message.author.id +
              ".json"
          );

          if (body === null) body = "undefined";
          if (body === "undefined") body = 0;
          var prostituir = body.prostituir;

          database
            .ref(`Servidores/Cooldown/${message.author.id}`)
            .update({
              prostituir: (prostituir = Date.now())
            });
          database
            .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
            .once("value")
            .then(async function(snap) {
              database
                .ref(
                  `Servidores/Banco/${message.guild.id}/${message.author.id}`
                )
                .update({
                  dinheiro: snap.val().dinheiro + Dinheirão
                });
              message.channel.send({
                embed: {
                  color: 3447003,
                  timestamp: new Date(),
                  title: "🔞 | GF, tirem as crianças do chat!!",
                  description:
                    random_prostituir[
                      Math.floor(Math.random() * random_prostituir.length)
                    ],
                  footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                  }
                }
              });
            });
        }
      });
  }
};


