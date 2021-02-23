const ms = require("parse-ms");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const config = require("../config.json");

module.exports = {
  name: "setgrana",
  aliases: ["setgrana", "setmoney", "setdinheiro"],
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

    let user =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]) ||
      message.author;
    if (!args[0])
      return message.channel.send(
        emoji.aviso + " | Você deve mencionar um usuário"
      );

    database
      .ref("Servidores/Banco/" + message.guild.id + "/" + user.id)
      .remove();

    message.channel.send({
      embed: {
        color: 3447003,
        title: message.author.tag,
        description:
          emoji.positivo +
          ` | O usuário ${user} teve o seu dinheiro removido com sucesso`
      }
    });
  }
};
