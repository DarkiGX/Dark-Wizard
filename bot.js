// PARA CONECTAR AS BIBLIOTECAS
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const snekfetch = require("snekfetch");
const terminal = require("chalk");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: false,
  messageCacheMaxSize: 500,
  messageCacheLifetime: 30000,
  messageSweepInterval: 250,
  latencyThreshold: 0,
  defaultImageSize: 50,
  fetchAllMembers: false,
  restTimeOffset: 0,
  restSweepInterval: 0,
  restWsBridgeTimeout: 0,
  restTimeOffset: -9999999999999999999,
  disabledEvents: [
  'CHANNEL_DELETE',
  'CHANNEL_UPDATE',
  'CHANNEL_PINS_UPDATE',
  'MESSAGE_DELETE',
  'MESSAGE_UPDATE',
  'MESSAGE_DELETE_BULK',
  'USER_NOTE_UPDATE',
  'USER_SETTINGS_UPDATE',
  'USER_GUILD_SETTINGS_UPDATE',
  'PRESENCE_UPDATE',
  'VOICE_STATE_UPDATE',
  'TYPING_START',
  'VOICE_SERVER_UPDATE',
  'RELATIONSHIP_ADD',
  'RELATIONSHIP_REMOVE'
],
  http: {
    version: 7,
    cdn: "https://cdn.discordapp.com",
    host: "https://discordapp.com",
    api: "https://discordapp.com/api"
  }
});
const config = require("./config.json");
config.client = config;

// DADOS DA DATABASE
const firebase = require("firebase");
const Firebase = require("./firebase.json");
const dbmdk = {
  apiKey: Firebase.apiKey,
  databaseURL: Firebase.databaseURL
};
firebase.initializeApp(dbmdk);

//db message
const updinheiro = new Set();
const uplevel = new Set();
const bloqbloq = new Set();
const emoji = require("./emoji.json");

// PARA FAZER O LOGIN
client
  .login(config.token)
  .then(token => {
    console.log(`Token Valido, loguei no bot ${client.user.tag}`);
  })
  .catch(error => {
    if (error.code !== 32233) {
      console.error("Token Invalido");
    }
  });

// SISTEMA HANDLER
fs.readdir("./eventos/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./eventos/${file}`);
    let eventName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${eventName}`));
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./CRIADOR/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[CRIADOR] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./CRIADOR/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./administracao/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[administracao] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./administracao/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./economia/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[economia] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./economia/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./interacao/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[interacao] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./interacao/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./usuario/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[usuario] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./usuario/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./jogos/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[jogos] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./jogos/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./utilidades/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[utilidades] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./utilidades/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./modulos/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[modulos] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./modulos/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

fs.readdir("./menu/", (err, files) => {
  if (err) return console.error(err);
  console.log(
    terminal.cyan.bold(
      `[menu] Carregando um total de ${files.length} comando(s)`
    )
  );
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./menu/${file}`);
    let commandName = file.split(".")[0];
    console.log(terminal.yellow.bold(`Carregando: ${commandName}`));
    client.commands.set(commandName, props);
  });
});

//SISTEMA DE DATABASE
client.on("message", async message => {
  const database = firebase.database();

var moment = require("moment")
require("moment-duration-format");
var atfk = moment.duration(new Date() - message.author.createdAt).format("d")
if (atfk < 15) return;

  /////DIANA
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  var { body } = await snekfetch.get(
    Firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
  );

  if (body === null) body = "undefined";
  if (body === "undefined") body = 0;
  var prefixo = `${body.prefixo ? body.prefixo : "d!"}`;

  const random_menção = [prefixo + "help", prefixo + "ajuda", prefixo + "menu"];
  const random_mention = [prefixo + "invite"];

  if (message.content.toLowerCase().includes(client.user.id)) {
    message.channel.send(
      `> Prazer, Eu sou o \`${
        client.user.tag
      }\` 🧙‍♂️\n> Para saber mais sobre as minhas funções, digite: **${
        random_menção[Math.floor(Math.random() * random_menção.length)]
      }**.\n> Use **${
        random_mention[Math.floor(Math.random() * random_mention.length)]
      }** para entrar no meu servidor de suporte!`
    );
  }

  if (message.content.toLowerCase().includes("dark")) {
    message.react("🧙‍♂️");
  }

  if (message.content.toLowerCase().includes("wizard")) {
    message.react("🧙‍♂️");
  }

  if (message.content.toLowerCase().includes(config.criador)) {
    message.react("👽");
  }
  
  ////////////////// EVENTOS ////////////////////
  /////CARRO FORTE
  /*const levelxpzão = Math.floor(Math.random() * 0) + 1;

  database
    .ref(`CARROFORTE/${message.guild.id}`)
    .once("value")
    .then(async function(snap) {
      if (!message.channel.guild) return;
      if (message.author.bot) return;

      if (snap.val() == null) {
        database.ref(`CARROFORTE/${message.guild.id}`).set({
          Drop: 1,
          mensagens: 4
        });
      }
      let mensagens = snap.val().mensagens + levelxpzão;
      let levelupp = snap.val().Drop * 1500;
      database.ref(`CARROFORTE/${message.guild.id}`).update({
        mensagens: mensagens
      });

      if (levelupp <= mensagens) {
        levelupp = snap.val().Drop + 1;
        database.ref(`CARROFORTE/${message.guild.id}`).update({
          Drop: levelupp
        });

        const tempo = 15;
        const carroforte = new Set();
        const dinheiro = 20000;

        await message.channel
        .send(
          "Os magos mandaram um baú com com **" +
            require("currency-formatter").format(dinheiro, {
              code: "de-DE",
              symbol: "R$ ",
              precision: 0
            }) +
            "** !!!\nVocês tem **__" +
            tempo +
            " Segundos__** para disputar, digite `abrir` para ganhar uma chave e ter uma chance de abri-lo",
          {
            file:
              "https://media.discordapp.net/attachments/783367484501262377/807010052224450601/drop_darkwizardGX.png"
          }
        )
        .then(async msg => {
          const filter = m => m.content.toLowerCase() === "abrir";
          const collector = msg.channel.createMessageCollector(filter, {
            time: tempo * 1000
          });
          var gotCorrectAnswer = false;
          let i = 1;
          let a = [];
          let b = [];
          collector.on("collect", async m => {
            gotCorrectAnswer = true;
            if (m.author.bot) return;
  
            var { body } = await require("snekfetch").get(
              require("../firebase.json").databaseURL +
                "/BlackList/" +
                m.author.id +
                ".json"
            );
  
            if (body === null) body = "undefined";
            if (body === "undefined") body = 0;
  
            const TEMPO = body.tempo;
            const DATA = body.data;
            const MOTIVO = body.motivo;
  
            const time = require("parse-ms")(TEMPO - (Date.now() - DATA));
            if (DATA !== null && TEMPO - (Date.now() - DATA) > 0) return;
  
            if (carroforte.has(m.author.id)) {
              //
            } else {
              m.react("🔑");
              a.push(m.author.id);
              b.push(`**[${i++}]** ${m.author.username}`);
              carroforte.add(m.author.id);
              setTimeout(() => {
                carroforte.delete(m.author.id);
              }, tempo * 1000);
            }
            m.delete(tempo * 1000);
            msg.delete(tempo * 1000);
          });
  
          setTimeout(async function() {
            if (a.length === 0)
              return message.channel
                .send(
                  "Como vocês são burros, deixaram um ladrão roubar a baú"
                )
                .then(m => m.delete(10000), msg.delete());
  
            let ganhador = a[Math.floor(Math.random() * a.length)];
  
            message.channel
              .send("**Participantes:** \n\n " + b.join("\n"))
              .then(async amsg => {
                setTimeout(async function() {
                  amsg.delete(1000);
  
                  var { body } = await require("snekfetch").get(
                    require("../firebase.json").databaseURL +
                      "/Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      ganhador +
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
  
                  database
                    .ref("Servidores/Banco/" + message.guild.id + "/" + ganhador)
                    .set({
                      dindin: banco,
                      dinheiro: dinmão + dinheiro
                    });
  
                  message.channel.send(
                    "<@" +
                      ganhador +
                      ">, você conseguiu a chave certa e abriu o baú, recebeu **" +
                      require("currency-formatter").format(dinheiro, {
                        code: "de-DE",
                        symbol: "R$ ",
                        precision: 0
                      }) +
                      "** na sua Carteira"
                  );
                }, 5000);
              });
          }, tempo * 1000);
          });
      }
    });*/

  //DINHEIRO
  if (updinheiro.has(message.author.id)) {
    //
  } else {
    database
      .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        if (!message.channel.guild) return;
        if (message.author.bot) return;

        if (snap.val() == null) {
          database
            .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
            .set({
              dinheiro: 0,
              dindin: 0,
              ID: message.author.id
            });
        }
        database
          .ref(`Servidores/Banco/${message.guild.id}/${message.author.id}`)
          .update({
            dinheiro: snap.val().dinheiro + 20
          });
      });

    updinheiro.add(message.author.id);
    setTimeout(() => {
      updinheiro.delete(message.author.id);
    }, 1 * 60000);
  }

  //LEVEL
  if (uplevel.has(message.author.id)) {
    //
  } else {
    const levelxp = Math.floor(Math.random() * 10) + 25;

    database
      .ref(`Servidores/Perfil/${message.guild.id}/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        if (!message.channel.guild) return;
        if (message.author.bot) return;

        if (snap.val() == null) {
          database
            .ref(`Servidores/Perfil/${message.guild.id}/${message.author.id}`)
            .set({
              xp: 0,
              level: 1,
              mensagens: 0,
              baseados: 0,
              ID: message.author.id,
              A: 0
            });
        }

        let xp = snap.val().xp + levelxp;
        let levelup = snap.val().level * 2500;
        database
          .ref(`Servidores/Perfil/${message.guild.id}/${message.author.id}`)
          .update({
            xp: xp
          });

        if (levelup <= xp) {
          levelup = snap.val().level + 1;
          database
            .ref(`Servidores/Perfil/${message.guild.id}/${message.author.id}`)
            .update({
              level: levelup
            });

          let LEVELXPAZAO = snap.val().level + 1;

          await message.channel
            .send(
              `🧙‍♂️ | Parabéns ${message.author}!\nVocê elevou sua magia para o level **${LEVELXPAZAO}**`
            )
            .then(m => m.delete(10000));
        }
      });

    uplevel.add(message.author.id);
    setTimeout(() => {
      uplevel.delete(message.author.id);
    }, 1 * 60000);
  }

  //AFK
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }

  database
    .ref(`AFK/${message.guild.id}/${user.id}`)
    .once("value")
    .then(async function(snap) {
      if (snap.val() == null) return;
      if (snap.val().afk === 0) return;

      const membro = client.users.get(snap.val().ID);

      if (message.content.toLowerCase().includes(membro.id)) {
        message.channel.send({
          embed: {
            description:
              emoji.aviso +
              " | O usuário <@" +
              snap.val().ID +
              "> está no modo AFK\n**Motivo:** `" +
              snap.val().msg +
              "`"
          }
        });
      }

      database
        .ref(`AFK/${message.guild.id}/${message.author.id}`)
        .once("value")
        .then(async function(snap) {
          if (snap.val() == null) return;
          if (snap.val().afk === 0) return;

          database.ref(`AFK/${message.guild.id}/${message.author.id}`).update({
            afk: snap.val().afk - snap.val().afk,
            msg: (snap.val().msg = 0)
          });
          message.channel
            .send(
              emoji.positivo + " | " + message.author + "você saiu do modo AFK!"
            )
            .then(m => m.delete(10000));
        });
    });
});


