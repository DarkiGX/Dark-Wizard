const ms = require("parse-ms");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const config = require("../config.json");

module.exports = {
  name: "addlevel",
  aliases: ["addlevel", "addnivel"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    const owner = message.guild.owner.user.id;

    if (
      message.author.id !== owner &&
      message.author.id !== config.criador &&
      message.author.id !== config.diana
    )
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            emoji.negativo + ` | Apenas <@${owner}> tem essa permissão!`
        }
      });

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    if (!args[0])
      return message.channel.send(
        emoji.aviso + " | Você deve mencionar um usuário"
      );
    if (user.bot)
      return message.channel.send(
        emoji.negativo + " | Você não pode adicionar Level em um Bot"
      );

    let quantidade = Number(args[1]);
    if (!args[1])
      return message.channel.send(
        emoji.aviso + " | Você deve inserir um valor"
      );
    let valor = quantidade * 2500;

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Perfil/" +
        message.guild.id +
        "/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var xp;
    if (!body) {
      xp = 0;
    } else {
      xp = Number(body.xp);
    }

    var level;
    if (!body) {
      level = 0;
    } else {
      level = Number(body.level);
    }

    var mensagens;
    if (!body) {
      mensagens = 0;
    } else {
      mensagens = Number(body.mensagens);
    }

    database.ref("Servidores/Perfil/" + message.guild.id + "/" + user.id).set({
      xp: xp + valor,
      level: level + quantidade,
      mensagens: mensagens,
      ID: user.id
    });

    message.channel.send({
      embed: {
        color: 3447003,
        title: "Adicionando Level",
        description: `O usuário ${user} recebeu **${quantidade}** de level.`
      }
    });
  }
};
