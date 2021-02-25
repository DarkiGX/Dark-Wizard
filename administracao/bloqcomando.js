const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const firebase = require("firebase");
module.exports = {
  async execute(client, message, args, database) {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
      message.channel.send(
        ":x: | Você precisa da permissão de `ADMINISTRATOR` para executar este comando"
      );
      return 0;
    }

    var { body } = await snekfetch.get(
      Firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefix = body.prefixo;
    let prefixo = `${prefix ? prefix : "d!"}`;
    /*
    var arr = [];
    var counter = 0;
    var pos = 1;
    firebase
      .database()
      .ref()
      .child("Servidores/Bloqcmd")
      .child(message.guild.id)
      .once("value", snapshot => {
        snapshot.forEach(v => {
          arr.push({
            chat: v.val().chat
          });

          counter++;
          if (counter === snapshot.numChildren()) {
            arr.sort(function(a, b) {
              return b.chat - a.chat;
            });
            var msgArr = [];
            var testee = [];
            arr.forEach(u => {
              let ms = u.chat;
              if (ms === undefined) ms = "undefined";
              if (ms === "undefined") ms = 0;
              if (ms === 0) return;

              msgArr.push(`<#${ms}>`);
            });
            var msg1 = msgArr.join(`, `);
          }
        });
      });*/

    let regexArray = args[0];
    if (!regexArray || regexArray.length < 1) {
      return message.channel.send({
        embed: {
          color: 3447003,
          title: "Bloqueador de Comandos",
          description:
            "**" +
            prefixo +
            "bloqcomando on** - Para bloquear comandos no canal executado \n **" +
            prefixo +
            "bloqcomando off** - Para desbloquear comandos no canal executado \n **" +
            prefixo +
            "bloqcomando msg** - Para alterar a mensagem de aviso \n `Exemplo: {member} Você não pode usar comandos aqui !`\n" +
            /*`${
              msg1
                ? "**Canais Bloqueados (" + msgArr.length + ")** - " + msg1
                : ""
            }`*/ 
            "\n **OBS:** Somente Administradores poderão executar comandos nos Canais Bloqueados",
          thumbnail: {
            url:
              "https://image.winudf.com/v2/image1/Y29tLnZsYWRsZWUuY2FsbGJsb2NrZXJfaWNvbl8xNTUyNTE0Mzc4XzA1NQ/icon.png?w=170&fakeurl=1"
          }
        }
      });
    }

    if (message.content.startsWith(prefixo + "bloqcomando on")) {
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

      var chat;
      if (!body) {
        chat = 0;
      } else {
        chat = Number(body.chat);
      }

      if (chat > 666)
        return message.channel
          .send(
            ":x: | " +
              message.author +
              " os meus comandos já estão bloqueados neste Canal"
          )
          .then(msg => msg.delete(5000), message.delete());

      database
        .ref(`Servidores/Bloqcmd/${message.guild.id}/${message.channel.id}`)
        .set({
          chat: (chat = message.channel.id)
        });

      message.channel
        .send({
          embed: {
            color: 3447003,
            title: message.author.tag,
            description: `✅ |  O meus comandos foram bloqueados no canal **${message.channel}**`
          }
        })
        .then(m => m.delete(10000), message.delete());
    }

    if (message.content.startsWith(prefixo + "bloqcomando off")) {
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

      var chat;
      if (!body) {
        chat = 0;
      } else {
        chat = Number(body.chat);
      }

      if (chat === 0)
        return message.channel
          .send(
            ":x: | " +
              message.author +
              " os meus comandos já estão desbloqueados neste Canal"
          )
          .then(msg => msg.delete(5000), message.delete());

      database
        .ref(`Servidores/Bloqcmd/${message.guild.id}/${message.channel.id}`)
        .remove();

      message.channel
        .send({
          embed: {
            color: 3447003,
            title: message.author.tag,
            description: `✅ |  O meus comandos foram desbloqueados no canal **${message.channel}**`
          }
        })
        .then(m => m.delete(10000), message.delete());
    }

    if (message.content.startsWith(prefixo + "bloqcomando msg")) {
      const mensagemfvc = args.slice(1).join(" ");
      if (!mensagemfvc)
        return message.channel
          .send("⚠ | Insira uma mensagem")
          .then(m => m.delete(5000), message.delete());

      if (mensagemfvc.length > 100)
        return message.channel
          .send(":x: | A mensagem não poder conter mais que **100** caracteres")
          .then(m => m.delete(5000), message.delete());

      var { body } = await snekfetch.get(
        Firebase.databaseURL +
          "/Servidores/Bloqcmd/" +
          message.guild.id +
          ".json"
      );

      if (body === null) body = "undefined";
      if (body === "undefined") body = 0;

      var bloqcmdmsg;
      if (!body) {
        bloqcmdmsg = 0;
      } else {
        bloqcmdmsg = Number(body.bloqcmdmsg);
      }

      database.ref(`Servidores/Bloqcmd/${message.guild.id}`).set({
        bloqcmdmsg: (bloqcmdmsg = mensagemfvc)
      });
      message.channel
        .send({
          embed: {
            color: 3447003,
            title: message.author.tag,
            description: `✅ |  Você alterou a mensagem com sucesso do **Bloqueador de Comandos**`
          }
        })
        .then(m => m.delete(10000), message.delete());
    }
  }
};
