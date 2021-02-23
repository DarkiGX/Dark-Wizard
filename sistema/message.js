const Firebase = require("../firebase.json");
const config = require("../config.json");
const emoji = require("../emoji.json");
const ms = require("parse-ms");
const snekfetch = require("snekfetch");
const tempslow = 3;
const cooldown = new Set();

module.exports = async (client, message) => {
  const firebase = require("firebase");
  const database = firebase.database();
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
    .toLowerCase()
    .slice(prefixo.length)
    .trim()
    .split(/ +/g);
  let comandosqtd = 0;
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);

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
            ` | ${message.author} Você está proibido de usar comandos por: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s \n **Motivo:** \`${MOTIVO}\``
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
              " os meus comandos estão bloqueados neste canal"
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
          " Aguarde **" +
          tempslow +
          "s** para usar outro comando novamente"
      )
      .then(m => m.delete(5000));
  } else {
    if (!cmd) return;
    cmd.run(client, message, args, database);
  }
};
