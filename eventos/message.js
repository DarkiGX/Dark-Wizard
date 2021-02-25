const prisão = 60 * 60000;
const ms = require("parse-ms");
const tempslow = 3;
const cooldown = new Set();
const updinheiro = new Set();
const uplevel = new Set();
const bloqbloq = new Set();
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const config = require("../config.json");
const firebase = require("firebase");
const database = firebase.database();
module.exports = async (client, message) => {
var moment = require("moment")
require("moment-duration-format");
var atfk = moment.duration(new Date() - message.author.createdAt).format("d")
if (atfk < 15) return;
  if (!message.channel.guild) return;
  if (message.author.bot) return;

  var { body } = await snekfetch.get(
    Firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
  );

  if (body === null) body = "undefined";
  if (body === "undefined") body = 0;
  var prefixo = `${body.prefixo ? body.prefixo : "d!"}`;

  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.content.toLowerCase().indexOf(prefixo) !== 0) return;
  const args = message.content
    .slice(prefixo.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  /////////////
  var { body } = await snekfetch.get(
    Firebase.databaseURL + "/BlackList/" + message.author.id + ".json"
  );

  if (body === null) body = "undefined";
  if (body === "undefined") body = 0;

  const TEMPO = body.tempo;
  const DATA = body.data;
  const MOTIVO = body.motivo;

  const time = ms(TEMPO - (Date.now() - DATA));
  if (DATA !== null && TEMPO - (Date.now() - DATA) > 0)
    return message.channel
      .send({
        embed: {
          color: 3447003,
          title: "BlackList",
          description:
            emoji.negativo +
            ` | ${message.author} Você está proibido de usar comandos por: ${time.days}d ${time.hours}h ${time.minutes}m e ${time.seconds}s \n **Motivo:** \`${MOTIVO}\```\nSerá que é tão díficil seguir as minhas regras?`
        }
      })
      .then(msg => msg.delete(10000), message.delete(10000));

  //////BLOQUEADOR DE COMANDOS
  var { body } = await snekfetch.get(
    Firebase.databaseURL + "/Servidores/Bloqcmd/" + message.guild.id + ".json"
  );

  if (body === null) body = "undefined";
  if (body === "undefined") body = 0;

  const bloqcmdmsg = body.bloqcmdmsg;
  const bloqcmdmsgdelete = body.bloqcmdmsgdelete;

  var { body } = await snekfetch.get(
    Firebase.databaseURL +
      "/Servidores/Bloqcmd/" +
      message.guild.id +
      "/" +
      message.channel.id +
      ".json"
  );

  if (body === null) body = "undefined";
  if (body === "undefined") body = 0;
  const bloqcmd = body.chat;

  if (bloqcmd > 666) {
    if (
      message.author.id !== config.criador &&
      message.author.id !== config.diana &&
      !message.member.hasPermission("ADMINISTRATOR", false, true, true)
    )
      return message.channel.send(
        `${
          bloqcmdmsg
            ? `${bloqcmdmsg.replace(/{member}/g, `${message.author}`)}`
            : "> " +
              emoji.negativo +
              " | " +
              message.author +
              " A magia dos meus comandos estão bloqueados neste canal :pensive:. Use o canal de comandos!"
        }`
      );
  }

  if (cooldown.has(message.author.id)) {
    message.delete();
    message.channel
      .send(
        "> " +
          emoji.relogio +
          " | " +
          message.author +
          " Caaalma ae, seus dedos estão enfeitiçados? Aguarde **" +
          tempslow +
          "s** para usar um comando novamente"
      )
      .then(m => m.delete(10000));
  } else {
    if (cmd) {
      try {
        if (!cmd) return;

        cmd.execute(client, message, args, database);
      } catch (error) {
        console.error(error);

        message.channel.send(
          "> " +
            emoji.negativo +
            " | " +
            message.author +
            " Ocorreu um erro ao tentar executar o comando!"
        );
      }
    }  else {
      message.channel.send(
        "> " +
          emoji.negativo +
          " | " +
          message.author +
          " Esse comando não existe, verifique a ortografia e tente novamente! Use `" + prefixo + "menu` para receber a lista de comandos."
      );
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, tempslow * 1000);
  }
};
