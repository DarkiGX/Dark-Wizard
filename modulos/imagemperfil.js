const Discord = require("discord.js");
let TempoCollector = 10;
let IMAGEMPERFIL = new Set();

module.exports = {
  name: "imagemperfil",
  aliases: ["imagemperfil", "imgperfil", "imageprofile", "imgprofile"],
  async execute(client, message, args, database, mdk) {
    const imgperfil = args[0];
     if (!imgperfil)
      return message.channel
        .send(
          "🔔 | Você precisa inserir um link de Imagem válido para o seu Perfil"
        )
        .then(m => m.delete(5000));

    if (/^https?:\/\/.+/gi.test(imgperfil)) {
      message.delete();

      const canvas = require("canvas").createCanvas(1020, 420);
      const c = canvas.getContext("2d");
      const bg = await require("canvas").loadImage(imgperfil);
      c.drawImage(bg, 0, 0, 1020, 420);
      const Attachment = new Discord.Attachment(
        canvas.toBuffer(),
        "profile.png"
      );

      message.channel
        .send({
          embed: {
            color: 3447003,
            title: "Imagem de Perfil",
            description:
              "Gostaria de definir essa imagem? \n\n Digite: `Sim` ou `Não`     *Tamanho Recomendado: **1024x420***",
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            file: Attachment,
            image: {
              url: "attachment://profile.png"
            }
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
            if (IMAGEMPERFIL.has(m.author.id)) {
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
                          imagemperfil: imgperfil,
                          sobremim: 0
                        });
                    }

                    database
                      .ref(`Servidores/Perfil2/${message.author.id}`)
                      .set({
                        imagemperfil: (snap.val().imagemperfil = imgperfil),
                        sobremim: snap.val().sobremim
                      });

                    message.channel.send({
                      embed: {
                        color: 3447003,
                        title: message.author.tag,
                        description:
                          "✅ | Você alterou a Imagem de Perfil com sucesso"
                      }
                    });
                  });
              }

              if (m.content.toLowerCase() === "não") {
                message.channel
                  .send("❌ | O comando foi recusado")
                  .then(m => m.delete(5000));
              }

              IMAGEMPERFIL.add(m.author.id);
              setTimeout(() => {
                IMAGEMPERFIL.delete(m.author.id);
              }, TempoCollector * 1000);
            }
          });
        });
    } else {
      return message.channel
        .send(
          "🔔 | Você precisa inserir um link de Imagem válido para o seu Perfil"
        )
        .then(m => m.delete(5000));
    }
  }
};
