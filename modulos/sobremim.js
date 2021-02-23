const snekfetch = require("snekfetch");
const firebase = require("../firebase.json");
const moment = require("moment");
let TempoCollector = 10;
let SOBREMIM = new Set();

module.exports = {
  name: "sobremim",
  aliases: ["sobremim", "aboutme"],
  async execute(client, message, args, database, mdk) {
    const sobremim = args.slice(0).join(" ");
    if (!sobremim)
      return message.channel
        .send("🔔 | Insira uma mensagem para o Sobre Mim")
        .then(m => m.delete(5000));

    if (sobremim.length > 200) {
      message.channel
        .send("🔔 | Sua mensagem não deve ter mais que 200 caracteres")
        .then(msg => msg.delete(10000), message.delete());
      return 0;
    }

    let convite = /(invite.io|discord.me|discord.gg)\/(invite)?/gi.test(
      message.content
    );
    if (convite === true) {
      if (message.author.id !== require("../config.json").criador) {
        return;
      }
    }

    message.delete();

    message.channel
      .send({
        embed: {
          color: 3447003,
          title: "Sobre Mim",
          description:
            "Gostaria de trocar a frase do seu Perfil para **" +
            sobremim +
            "** ? \n\n Digite: `Sim` ou `Não`"
        }
      })
      .then(async msg => {
        msg.delete(TempoCollector * 1000);
        let teste;
        const filter = m => m.author.id === message.author.id;
        const collector = msg.channel.createMessageCollector(filter, {
          time: TempoCollector * 1000
        });
        teste = false;
        collector.on("collect", async m => {
          teste = true;
          if (SOBREMIM.has(m.author.id)) {
            //
          } else {
            if (m.content.toLowerCase() === "sim") {
              database
                .ref(`Servidores/Perfil2/${message.author.id}`)
                .once("value")
                .then(async function(snap) {
                  if (snap.val() == null) {
                    database
                      .ref(`Servidores/Perfil2/${message.author.id}`)
                      .set({
                        imagemperfil: 0,
                        sobremim: sobremim
                      });
                  }

                  database.ref(`Servidores/Perfil2/${message.author.id}`).set({
                    imagemperfil: snap.val().imagemperfil,
                    sobremim: (snap.val().sobremim = sobremim)
                  });

                  message.channel.send({
                    embed: {
                      title: message.author.tag,
                      description: "✅ | Você alterou o Sobre Mim com sucesso"
                    }
                  });
                });
            }

            if (m.content.toLowerCase() === "não") {
              message.channel
                .send("❌ | O comando foi cancelado")
                .then(m => m.delete(5000));
            }

            SOBREMIM.add(m.author.id);
            setTimeout(() => {
              SOBREMIM.delete(m.author.id);
            }, TempoCollector * 1000);
          }
        });
      });
  }
};
