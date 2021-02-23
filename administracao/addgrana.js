const ms = require("parse-ms");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const config = require("../config.json");

module.exports = {
  name: "addgrana",
  aliases: ["addgrana", "addmoney", "adddinheiro"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    var { body } = await snekfetch.get(
      Firebase.databaseURL + "/Servidores/Dono2/" + message.guild.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Dono2;
    if (!body) {
      Dono2 = 0;
    } else {
      Dono2 = Number(body.dono2);
    }

    const owner = message.guild.owner.user.id;

    if (
      message.author.id !== owner &&
      message.author.id !== Dono2 &&
      message.author.id !== config.criador &&
      message.author.id !== config.diana
    )
      return message.channel.send({
        embed: {
          color: 3447003,
          description:
            emoji.negativo + ` | Apenas <@${owner}> tem essa permissão`
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

    let quantidade = Number(args[1]);
    if (!args[1])
      return message.channel.send(
        emoji.aviso + " | Você deve inserir uma quantia"
      );

    var { body } = await snekfetch.get(
      Firebase.databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var banco;
    if (!body) {
      banco = 0;
    } else {
      banco = Number(body.dindin);
    }

    var dinmão;
    if (!body) {
      dinmão = 0;
    } else {
      dinmão = Number(body.dinheiro);
    }

    database.ref("Servidores/Banco/" + message.guild.id + "/" + user.id).set({
      dindin: banco + quantidade,
      dinheiro: dinmão
    });

    //
    message.channel.send({
      embed: {
        color: 3447003,
        title: "Adicionando Dinheiro",
        description:
          emoji.dinheiro +
          ` | O usuário ${user} recebeu **R$ ${quantidade}** no Banco`
      }
    });
  }
};
