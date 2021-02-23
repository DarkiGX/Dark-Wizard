const emoji = require("../emoji.json");
const config = require("../config.json");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const firebase = require("../firebase.json");

module.exports = {
  name: "setprefixo",
  aliases: ["setprefixo", "setprefix"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    if (
      !message.member.hasPermission("ADMINISTRATOR", false, true, true) &&
      message.author.id !== config.criador
    ) {
      message.channel.send(
        emoji.negativo +
          " | Você não tem permissão de `Administrador` para executar este comando"
      );
      return 0;
    }

    let prefix = args[0];
    if (!prefix)
      return message.channel
        .send({
          embed: {
            color: 3447003,
            description: emoji.aviso + " | Você deve inserir um novo prefixo"
          }
        })
        .then(m => m.delete(10000), message.delete(10000));

    var { body } = await snekfetch.get(
      firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Prefixo;
    if (!body) {
      Prefixo = 0;
    } else {
      Prefixo = Number(body.prefixo);
    }

    database.ref("Servidores/Prefixo/" + message.guild.id).set({
      prefixo: (Prefixo = prefix)
    });

    message.channel
      .send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          timestamp: new Date(),
          description:
            emoji.positivo +
            " | Meu prefixo foi definido para: " +
            "`" +
            prefix +
            "` com sucesso",
          footer: {
            text: message.guild.name
          }
        }
      })
      .then(m => m.delete(10000), message.delete(10000));
  }
};
