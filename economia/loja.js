const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Firebase = require("../firebase.json");
const emoji = require("../emoji.json");
const config = require("../config.json");
const firebase = require("firebase");

let loja = new Set();
let TempoCollector = 10;

//LOJA MACONHA
let lote = 15000;
let Sementes = 8500;

//LOJA ARMAS
let valorarma1 = 20000;
let valorarma2 = 30000;
let valorarma3 = 38500;
let valorarma4 = 50000;
let valorarma5 = 15000;
let valorporte = 12000;

//LOJA UTILIDADES
let valorBalas = 5000;
let valorvara = 15000;
let valorcamarao = 5000;

//LOJA POÇÕES
let valorduckets = 7500;
let ducketsvalor = 3;

//LOJA NEGRA
let valorpeixe = 12;
let valorcarne = 10;
let valormaconha = 750;

module.exports = {
  name: "loja",
  aliases: ["loja", "store", "shopping"],
  async execute(client, message, args, database, mdk) {
    var { body } = await snekfetch.get(
      Firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefixo = `${body.prefixo ? body.prefixo : "d!"}`;

    let regexArray = args[0];
    if (!regexArray || regexArray.length < 1) {
      return message.channel.send({
        embed: {
          color: 3447003,
          timestamp: new Date(),
          title: "Sistema de Loja",
          description:
            /*prefixo +
            "Loja Tags \n" +*/
            prefixo +
            "loja maconha \n" +
            prefixo +
            "loja armas\n" +
            /*prefixo +
            "Loja Mascote\n" +*/
            prefixo +
            "loja utilidades\n" +
            prefixo +
            "loja esmeralda\n" +
            prefixo +
            "loja vendas",
          footer: {
            icon_url: message.guild.iconURL,
            text: message.guild.name
          },
          thumbnail: {
            url: message.guild.iconURL
          }
        }
      });
    }
    //
    /*if (message.content.toLowerCase() == prefixo + "loja tags") {
    }*/
    //
    if (message.content.toLowerCase() == prefixo + "loja maconha") {
      message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Loja de Maconha",
            description:
              "Digite o número do item que deseja comprar \n\n" +
              emoji.um +
              " Lote 2 de Plantação | " +
              require("currency-formatter").format(lote, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              " \n" +
              emoji.dois +
              " Lote 3 de Plantação | " +
              require("currency-formatter").format(lote, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              " \n" +
              emoji.tres +
              " 9 Sementes de Maconha | " +
              require("currency-formatter").format(Sementes, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "",
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            thumbnail: {
              url: message.guild.iconURL
            }
          }
        })
        .then(async msg => {
          msg.delete(TempoCollector * 1000);
          message.delete(TempoCollector * 1000);
          let teste;
          const filter = m => m.author.id === message.author.id;
          const collector = msg.channel.createMessageCollector(filter, {
            time: TempoCollector * 1000
          });
          teste = false;
          collector.on("collect", async m => {
            //m.delete(10 * 1000);
            //m.delete(10 * 1000);
            teste = true;
            if (m.content < 1) return;
            if (m.content > 3) return;
            if (isNaN(m.content)) return;
            if (m.content === "1") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var dinmão;
                if (!body) {
                  dinmão = 0;
                } else {
                  dinmão = Number(body.dinheiro);
                }

                if (dinmão < lote)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro o suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Plantação/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var lote1;
                if (!body) {
                  lote1 = 0;
                } else {
                  lote1 = Number(body.lote1);
                }

                var lote2;
                if (!body) {
                  lote2 = 0;
                } else {
                  lote2 = Number(body.lote2);
                }

                if (lote2 > 0)
                  return message.channel.send("Você já adquiriu este lote");

                var lote3;
                if (!body) {
                  lote3 = 0;
                } else {
                  lote3 = Number(body.lote3);
                }

                var adubo;
                if (!body) {
                  adubo = 0;
                } else {
                  adubo = Number(body.adubo);
                }

                var semente;
                if (!body) {
                  semente = 0;
                } else {
                  semente = Number(body.semente);
                }

                var maconha;
                if (!body) {
                  maconha = 0;
                } else {
                  maconha = Number(body.maconha);
                }

                database
                  .ref(
                    "Servidores/Plantação/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    lote1: lote1,
                    lote2: (lote2 = 1),
                    lote3: lote3,
                    adubo: adubo,
                    maconha: maconha,
                    semente: semente
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - lote
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003, 
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Lote 2 de Plantação** por **${require("currency-formatter").format(
                        lote,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //

            if (m.content === "2") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var dinmão;
                if (!body) {
                  dinmão = 0;
                } else {
                  dinmão = Number(body.dinheiro);
                }

                if (dinmão < lote)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro o suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Plantação/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var lote1;
                if (!body) {
                  lote1 = 0;
                } else {
                  lote1 = Number(body.lote1);
                }

                var lote2;
                if (!body) {
                  lote2 = 0;
                } else {
                  lote2 = Number(body.lote2);
                }

                var lote3;
                if (!body) {
                  lote3 = 0;
                } else {
                  lote3 = Number(body.lote3);
                }

                if (lote3 > 0)
                  return message.channel.send("Você já adquiriu este lote");

                var adubo;
                if (!body) {
                  adubo = 0;
                } else {
                  adubo = Number(body.adubo);
                }

                var semente;
                if (!body) {
                  semente = 0;
                } else {
                  semente = Number(body.semente);
                }

                var maconha;
                if (!body) {
                  maconha = 0;
                } else {
                  maconha = Number(body.maconha);
                }

                database
                  .ref(
                    "Servidores/Plantação/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    lote1: lote1,
                    lote2: lote2,
                    lote3: (lote3 = 1),
                    adubo: adubo,
                    maconha: maconha,
                    semente: semente
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - lote
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Lote 3 de Plantação** por **${require("currency-formatter").format(
                        lote,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "3") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var dinmão;
                if (!body) {
                  dinmão = 0;
                } else {
                  dinmão = Number(body.dinheiro);
                }

                if (dinmão < Sementes)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro o suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Plantação/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var lote1;
                if (!body) {
                  lote1 = 0;
                } else {
                  lote1 = Number(body.lote1);
                }

                var lote2;
                if (!body) {
                  lote2 = 0;
                } else {
                  lote2 = Number(body.lote2);
                }

                var lote3;
                if (!body) {
                  lote3 = 0;
                } else {
                  lote3 = Number(body.lote3);
                }

                var adubo;
                if (!body) {
                  adubo = 0;
                } else {
                  adubo = Number(body.adubo);
                }

                var semente;
                if (!body) {
                  semente = 0;
                } else {
                  semente = Number(body.semente);
                }

                var maconha;
                if (!body) {
                  maconha = 0;
                } else {
                  maconha = Number(body.maconha);
                }

                database
                  .ref(
                    "Servidores/Plantação/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    lote1: lote1,
                    lote2: lote2,
                    lote3: lote3,
                    adubo: adubo,
                    maconha: maconha,
                    semente: semente + 9
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - Sementes
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **9 Sementes de Maconha** por **${require("currency-formatter").format(
                        Sementes,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
          });
        });
    }
    //
    if (message.content.toLowerCase() == prefixo + "loja armas") {
      message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Loja de Armas",
            description:
              "Digite o número do item que deseja comprar \n\n" +
              emoji.um +
              " - Revolver 38 | " +
              require("currency-formatter").format(valorarma1, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.dois +
              " - Pistola Desert Eagle | " +
              require("currency-formatter").format(valorarma2, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.tres +
              " - Escopeta Shotgun | " +
              require("currency-formatter").format(valorarma3, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.quatro +
              " - Fuzil AK-47 | " +
              require("currency-formatter").format(valorarma4, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.cinco +
              " - Arma de Caça | " +
              require("currency-formatter").format(valorarma5, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.seis +
              " - Porte de Arma | " +
              require("currency-formatter").format(valorporte, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n\n**__Informações__** \n\n Revolver 38 - 15% de chance de Roubo \n Pistola Desert Eagle - 35% de chance de Roubo \n Escopeta shotgun - 60% de chance de Roubo \n Fuzil AK-47 - 85% de chance de Roubo",
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            thumbnail: {
              url: message.guild.iconURL
            }
          }
        })
        .then(async msg => {
          msg.delete(TempoCollector * 3000);
          message.delete(TempoCollector * 3000);
          let teste;
          const filter = m => m.author.id === message.author.id;
          const collector = msg.channel.createMessageCollector(filter, {
            time: TempoCollector * 1000
          });
          teste = false;
          collector.on("collect", async m => {
            //m.delete(10 * 1000);
            //m.delete(10 * 1000);
            teste = true;
            if (m.content < 1) return;
            if (m.content > 6) return;
            if (isNaN(m.content)) return;
            if (m.content === "1") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse < 1)
                  return message.channel.send(
                    emoji.negativo + " | Você não possui Porte de Arma"
                  );
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorarma1)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;
                ////

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                if (Arma > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui uma Arma"
                  );

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: (Arma = m.content),
                    munição: Munição + 6,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorarma1
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Revolver 38** por **${require("currency-formatter").format(
                        valorarma1,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "2") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse < 1)
                  return message.channel.send(
                    emoji.negativo + " | Você não possui Porte de Arma"
                  );
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorarma2)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                ////

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                if (Arma > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui uma Arma"
                  );

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: (Arma = m.content),
                    munição: Munição + 12,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorarma2
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Pistola Desert Eagle** por **${require("currency-formatter").format(
                        valorarma2,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "3") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse < 1)
                  return message.channel.send(
                    emoji.negativo + " | Você não possui Porte de Arma"
                  );
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorarma3)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                ////

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                if (Arma > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui uma Arma"
                  );

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: (Arma = m.content),
                    munição: Munição + 18,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorarma3
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Escopeta Shotgun** por **${require("currency-formatter").format(
                        valorarma3,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "4") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse < 1)
                  return message.channel.send(
                    emoji.negativo + " | Você não possui Porte de Arma"
                  );
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorarma4)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                ////

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                if (Arma > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui uma Arma"
                  );

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: (Arma = m.content),
                    munição: Munição + 12,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorarma4
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Fuzil AK-47** por **${require("currency-formatter").format(
                        valorarma4,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "5") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse < 1)
                  return message.channel.send(
                    emoji.negativo + " | Você não possui Porte de Arma"
                  );
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorarma5)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                ////

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                if (Armacaça > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui uma Arma de Caça"
                  );

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: Arma,
                    munição: Munição + 30,
                    portedearma: Posse,
                    armacaça: (Armacaça = 1),
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorarma5
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Arma de Caça** por **${require("currency-formatter").format(
                        valorarma5,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "6") {
              teste = true;
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                if (Posse > 0)
                  return message.channel.send(
                    emoji.negativo + " | Você já possui Porte de Arma"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorporte)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                ////
                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: Arma,
                    munição: Munição,
                    portedearma: (Posse = 1),
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorporte
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Porte de Arma** por **${require("currency-formatter").format(
                        valorporte,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
          });
          //////
        });
    } /*
    //
    if (message.content.toLowerCase() == prefixo + "loja mascote") {
    }*/
    //
    if (message.content.toLowerCase() == prefixo + "loja utilidades") {
      message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Loja de Utilidades",
            description:
              "Digite: " +
              prefixo +
              "Digite o número do item que deseja comprar \n\n" +
              emoji.um +
              " - Cartucho com 30 Balas | " +
              require("currency-formatter").format(valorBalas, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.dois +
              " - Vara de Pesca | " +
              require("currency-formatter").format(valorvara, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n" +
              emoji.tres +
              " - 7 Camarões | " +
              require("currency-formatter").format(valorcamarao, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "\n",
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            thumbnail: {
              url: message.guild.iconURL
            }
          }
        })
        .then(async msg => {
          msg.delete(TempoCollector * 1000);
          message.delete(TempoCollector * 1000);
          let teste;
          const filter = m => m.author.id === message.author.id;
          const collector = msg.channel.createMessageCollector(filter, {
            time: TempoCollector * 1000
          });
          teste = false;
          collector.on("collect", async m => {
            //m.delete(10 * 1000);
            //m.delete(10 * 1000);
            teste = true;
            if (m.content < 1) return;
            if (m.content > 3) return;
            if (isNaN(m.content)) return;
            if (m.content === "1") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorBalas)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: Arma,
                    munição: Munição + 30,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorBalas
                  });

                return message.channel.send({
                  embed: {
                    color: 344703,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Cartucho com 30 Balas** por **${require("currency-formatter").format(
                        valorBalas,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                /////
                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }

            //
            if (m.content === "2") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                /////
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorvara)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                if (Vara > 0)
                  return message.channel.send(
                    ":x: | Você já possui uma Vara de Pescar"
                  );

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: Arma,
                    munição: Munição,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: (Vara = 1),
                    camarao: Camarao + 2
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorvara
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Vara de Pescar** por **${require("currency-formatter").format(
                        valorvara,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "3") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                /////
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorcamarao)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                if (Vara < 1)
                  return message.channel.send(
                    ":x: | Você não possui uma Vara de Pescar"
                  );

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: Arma,
                    munição: Munição,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao + 7
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorcamarao
                  });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **7 Camarões** por **${require("currency-formatter").format(
                        valorcamarao,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
          });
        });
    }
    //
    if (message.content.toLowerCase() == prefixo + "loja esmeralda") {
      message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Loja Esmeralda",
            description:
              "Digite o número do item que deseja comprar \n\n" +
              emoji.um +
              " - Anel de Casamento | " +
              require("currency-formatter").format(valorduckets, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              " + " +
              ducketsvalor +
              " Poções\n",
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            thumbnail: {
              url: message.guild.iconURL
            }
          }
        })
        .then(async msg => {
          msg.delete(TempoCollector * 1000);
          message.delete(TempoCollector * 1000);
          let teste;
          const filter = m => m.author.id === message.author.id;
          const collector = msg.channel.createMessageCollector(filter, {
            time: TempoCollector * 1000
          });
          teste = false;
          collector.on("collect", async m => {
            //m.delete(10 * 1000);
            //m.delete(10 * 1000);
            teste = true;
            if (m.content < 1) return;
            if (m.content > 2) return;
            if (isNaN(m.content)) return;
            if (m.content === "1") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Duckets/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Duckets;
                if (!body) {
                  Duckets = 0;
                } else {
                  Duckets = Number(body.duckets);
                }

                if (Duckets < ducketsvalor)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem Esmeraldas suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Dinheiro;
                if (!body) {
                  Dinheiro = 0;
                } else {
                  Dinheiro = Number(body.dinheiro);
                }

                if (Dinheiro < valorduckets)
                  return message.channel.send(
                    emoji.negativo + " | Você não tem dinheiro suficiente"
                  );

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/InvGlobal/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Anel;
                if (!body) {
                  Anel = 0;
                } else {
                  Anel = Number(body.anelcasamento);
                }

                if (Anel > 0)
                  return message.channel.send(
                    ":x: | Você já possui Anel de Casamento"
                  );

                database.ref("InvGlobal/" + message.author.id).set({
                  anelcasamento: (Anel = 1)
                });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão - valorduckets
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Duckets/" +
                    message.author.id +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Duckets;
                if (!body) {
                  Duckets = 0;
                } else {
                  Duckets = Number(body.duckets);
                }

                database.ref("Duckets/" + message.author.id).set({
                  ID: message.author.id,
                  duckets: Duckets - ducketsvalor
                });

                return message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Compra Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você adquiriu **Anel de Casamento** por **R$ ${valorduckets} + ${ducketsvalor}** Esmeraldas`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
          });
        });
    }
    //
    if (message.content.toLowerCase() == prefixo + "loja vendas") {
      let VALORARMA1 = valorarma1 / 2;
      let VALORARMA2 = valorarma2 / 2;
      let VALORARMA3 = valorarma3 / 2;
      let VALORARMA4 = valorarma4 / 2;

      message.channel
        .send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            title: "Loja de Vendas",
            description:
              "Digite o número do item que deseja vender \n\n" +
              emoji.um +
              " - Peixe **R$ " +
              valorpeixe +
              "/Kilo** \n" +
              emoji.dois +
              " - Carne **R$ " +
              valorcarne +
              "/Kilo** \n" +
              emoji.tres +
              " - Armas |** \n" +
              emoji.quatro +
              " - Maconha **R$ " +
              valormaconha +
              "/Kilo** \n\n **__Informações:__**\n\n Revolver 38 - **R$ " +
              require("currency-formatter").format(VALORARMA1, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "** \n Pistola Desert Eagle - **R$ " +
              require("currency-formatter").format(VALORARMA2, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "** \n Escopeta Shotgun - **R$ " +
              require("currency-formatter").format(VALORARMA3, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }) +
              "** \n Fuzil AK-47 - **R$ " +
              require("currency-formatter").format(VALORARMA4, {
                code: "de-DE",
                symbol: "R$ ",
                precision: 0
              }),
            footer: {
              icon_url: message.author.avatarURL,
              text: `Você tem apenas ${TempoCollector} segundos para responder`
            },
            thumbnail: {
              url: message.guild.iconURL
            }
          }
        })
        .then(async msg => {
          msg.delete(TempoCollector * 1000);
          message.delete(TempoCollector * 1000);
          let teste;
          const filter = m => m.author.id === message.author.id;
          const collector = msg.channel.createMessageCollector(filter, {
            time: TempoCollector * 1000
          });
          teste = false;
          collector.on("collect", async m => {
            //m.delete(10 * 1000);
            //m.delete(10 * 1000);
            teste = true;
            if (m.content < 1) return;
            if (m.content > 4) return;
            if (isNaN(m.content)) return;
            if (m.content === "1") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Inventario/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Carne;
                if (!body) {
                  Carne = 0;
                } else {
                  Carne = Number(body.carne);
                }

                var Peixe;
                if (!body) {
                  Peixe = 0;
                } else {
                  Peixe = Number(body.peixe);
                }

                if (Peixe < 50)
                  return message.channel.send(
                    emoji.negativo +
                      " | " +
                      message.author +
                      " você precisa possuir no minimo `50KG` de Peixe para vender"
                  );

                let GanhaPão = Peixe * valorpeixe;

                database
                  .ref(
                    "Servidores/Inventario/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    carne: Carne,
                    peixe: Peixe - Peixe
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão + GanhaPão
                  });

                message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Venda Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você vendeu \`${Peixe}KG\` de Peixe por **R$ ${require("currency-formatter").format(
                        GanhaPão,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "2") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Inventario/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Peixe;
                if (!body) {
                  Peixe = 0;
                } else {
                  Peixe = Number(body.peixe);
                }

                var Carne;
                if (!body) {
                  Carne = 0;
                } else {
                  Carne = Number(body.carne);
                }

                if (Carne < 50)
                  return message.channel.send(
                    emoji.negativo +
                      " | " +
                      message.author +
                      " você precisa possuir no minimo `50KG` de Carne para vender"
                  );

                let GanhaPão = Carne * valorcarne;

                database
                  .ref(
                    "Servidores/Inventario/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    carne: Carne - Carne,
                    peixe: Peixe
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão + GanhaPão
                  });

                message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Venda Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você vendeu \`${Carne}KG\` de Carne por **R$ ${GanhaPão}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "3") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Armas/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
                    ".json"
                );
                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var Arma;
                if (!body) {
                  Arma = 0;
                } else {
                  Arma = Number(body.arma);
                }

                if (Arma < 1)
                  return message.channel.send(
                    emoji.negativo +
                      " | " +
                      message.author +
                      " você não possui uma Arma"
                  );

                let preço;
                if (Arma === 1) preço = 10000; //revolver
                if (Arma === 2) preço = 15000; //revolver
                if (Arma === 3) preço = 19250; //revolver
                if (Arma === 4) preço = 25000; //revolver

                let item;
                if (Arma === 1) item = "Revolver 38"; //revolver
                if (Arma === 2) item = "Pistola Desert Eagle"; //revolver
                if (Arma === 3) item = "Escopeta Shotgun"; //revolver
                if (Arma === 4) item = "Fuzil AK-47"; //revolver

                var Munição;
                if (!body) {
                  Munição = 0;
                } else {
                  Munição = Number(body.munição);
                }

                var Armacaça;
                if (!body) {
                  Armacaça = 0;
                } else {
                  Armacaça = Number(body.armacaça);
                }

                var Vara;
                if (!body) {
                  Vara = 0;
                } else {
                  Vara = Number(body.vara);
                }

                var Camarao;
                if (!body) {
                  Camarao = 0;
                } else {
                  Camarao = Number(body.camarao);
                }

                var Posse;
                if (!body) {
                  Posse = 0;
                } else {
                  Posse = Number(body.portedearma);
                }

                database
                  .ref(
                    "Servidores/Armas/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    arma: (Arma = 0),
                    munição: Munição,
                    portedearma: Posse,
                    armacaça: Armacaça,
                    vara: Vara,
                    camarao: Camarao
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão + preço
                  });

                message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Venda Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você vendeu \`${item}\` por **R$ ${require("currency-formatter").format(
                        preço,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
            //
            if (m.content === "4") {
              teste = true;
              console.log(m.content);
              if (loja.has(m.author.id)) {
                //
              } else {
                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var lote1;
                if (!body) {
                  lote1 = 0;
                } else {
                  lote1 = Number(body.lote1);
                }

                var lote2;
                if (!body) {
                  lote2 = 0;
                } else {
                  lote2 = Number(body.lote2);
                }

                var lote3;
                if (!body) {
                  lote3 = 0;
                } else {
                  lote3 = Number(body.lote3);
                }

                var adubo;
                if (!body) {
                  adubo = 0;
                } else {
                  adubo = Number(body.adubo);
                }

                var semente;
                if (!body) {
                  semente = 0;
                } else {
                  semente = Number(body.semente);
                }

                var maconha;
                if (!body) {
                  maconha = 0;
                } else {
                  maconha = Number(body.maconha);
                }

                if (maconha < 10)
                  return message.channel.send(
                    emoji.negativo +
                      " | " +
                      message.author +
                      " você precisa possuir no minimo `10KG` de Maconha para vender"
                  );

                let GanhaPão = maconha * valormaconha;

                database
                  .ref(
                    "Servidores/Plantação/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    lote1: lote1,
                    lote2: lote2,
                    lote3: lote3,
                    adubo: adubo,
                    maconha: maconha - maconha,
                    semente: semente
                  });

                var { body } = await snekfetch.get(
                  Firebase.databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    message.author.id +
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
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    ID: message.author.id,
                    dindin: banco,
                    dinheiro: dinmão + GanhaPão
                  });

                message.channel.send({
                  embed: {
                    color: 3447003,
                    title: "Venda Efetuada",
                    description:
                      emoji.positivo +
                      ` | Você vendeu \`${maconha}KG\` de Maconha por **${require("currency-formatter").format(
                        GanhaPão,
                        { code: "de-DE", symbol: "R$ ", precision: 0 }
                      )}**`
                  }
                });

                loja.add(m.author.id);
                setTimeout(() => {
                  loja.delete(m.author.id);
                }, TempoCollector * 1000);
              }
            }
          });
        });
    }
  }
};



