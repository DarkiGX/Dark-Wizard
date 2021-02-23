const ranktop = 15;

module.exports = {
  name: "rank",
  aliases: ["rank", "leaderboard"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Prefixo/" +
        message.guild.id +
        ".json"
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
          title: "Sistema de Rank",
          description:
            prefixo +
            "rank level \n" +
            prefixo +
            "rank dinheiro \n" +
            prefixo +
            "rank esmeraldas `(Global)`",
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
    if (message.content.toLowerCase() == prefixo + "rank level") {
      var arr = [];
      var counter = 0;
      var pos = 1;
      require("firebase")
        .database()
        .ref()
        .child("Servidores/Perfil")
        .child(message.guild.id)
        .once("value", snapshot => {
          if (snapshot.val() == null) {
            message.channel.send({
              embed: {
                color: 3447003,
                title: "Rank de Level Top " + ranktop,
                description:
                  "❌ | Não há registros de Level para este servidor!"
              }
            });
            return;
          }
          snapshot.forEach(v => {
            arr.push({
              ID: v.key,
              level: v.val().level,
              xp: v.val().xp
            });

            counter++;
            if (counter === snapshot.numChildren()) {
              arr.sort(function(a, b) {
                return b.xp - a.xp;
              });
              var top_15 = arr.slice(0, ranktop);
              var msgArr = [];
              var count = 0;
              top_15.forEach(u => {
                msgArr.push(
                  `**${pos++}** ${client.users.get(
                    u.ID
                  )} - Level: **${require("currency-formatter").format(
                    u.level,
                    { code: "de-DE", precision: 0 }
                  )}**`
                );
                count++;
                if (count == top_15.length) {
                  var msg1 = msgArr.join(`\n`);
                  message.channel.send({
                    embed: {
                      color: 3447003,
                      timestamp: new Date(),
                      title: "Rank de Level Top " + ranktop,
                      description: msg1,

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
              });
            }
          });
        });
    }
    //
    if (message.content.toLowerCase() == prefixo + "rank dinheiro") {
      var arr = [];
      var counter = 0;
      var pos = 1;
      require("firebase")
        .database()
        .ref()
        .child("Servidores/Banco")
        .child(message.guild.id)
        .once("value", snapshot => {
          if (snapshot.val() == null) {
            message.channel.send({
              embed: {
                color: 3447003,
                title: "Rank de Dinheiro Top " + ranktop,
                description:
                  "❌ | Não há registros de Dinheiro para este servidor!"
              }
            });
            return;
          }
          snapshot.forEach(v => {
            arr.push({
              ID: v.key,
              dindin: v.val().dindin
            });

            counter++;
            if (counter === snapshot.numChildren()) {
              arr.sort(function(a, b) {
                return b.dindin - a.dindin;
              });
              var top_15 = arr.slice(0, ranktop);
              var msgArr = [];
              var count = 0;
              top_15.forEach(u => {
                msgArr.push(
                  `**${pos++} ${client.users.get(
                    u.ID
                  )}** - Dinheiro: **${require("currency-formatter").format(
                    u.dindin,
                    { code: "de-DE", symbol: "R$ ", precision: 0 }
                  )}**`
                );
                count++;
                if (count == top_15.length) {
                  var msg2 = msgArr.join(`\n`);
                  message.channel.send({
                    embed: {
                      color: 3447003,
                      timestamp: new Date(),
                      title: "Rank de Dinheiro Top " + ranktop,
                      description: msg2,

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
              });
            }
          });
        });
    }
    //
    if (message.content.toLowerCase() == prefixo + "rank esmeraldas") {
      var arr = [];
      var counter = 0;
      var pos = 1;
      require("firebase")
        .database()
        .ref()
        .child("Duckets")
        .once("value", snapshot => {
          if (snapshot.val() == null) {
            message.channel.send({
              embed: {
                color: 3447003,
                title: "Rank de Esmeraldas Top " + ranktop,
                description: "❌ | Não há registros de Esmeraldas Global!"
              }
            });
            return;
          }
          snapshot.forEach(v => {
            arr.push({
              ID: v.key,
              duckets: v.val().duckets
            });

            counter++;
            if (counter === snapshot.numChildren()) {
              arr.sort(function(a, b) {
                return b.duckets - a.duckets;
              });
              var top_15 = arr.slice(0, ranktop);
              var msgArr = [];
              var count = 0;
              top_15.forEach(u => {
                msgArr.push(
                  `**${pos++}** ${client.users.get(
                    u.ID
                  )} - Esmeraldas: **${require("currency-formatter").format(
                    u.duckets,
                    { code: "de-DE", precision: 0 }
                  )}**`
                );
                count++;
                if (count == top_15.length) {
                  var msg3 = msgArr.join(`\n`);
                  message.channel.send({
                    embed: {
                      color: 3447003,
                      timestamp: new Date(),
                      title: "Rank de Esmeraldas Top " + ranktop,
                      description: msg3,

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
              });
            }
          });
        });
      //
    }
  }
};
