const Discord = require("discord.js");
var bjGames = new Array();
var Deck = require("../arquivos/blackjack/deck.js");
var Hand = require("../arquivos/blackjack/hand.js");
const ms = require("parse-ms");
const snekfetch = require("snekfetch");
const firebase = require("../firebase.json");
const emoji = require("../emoji.json");
let ImgBlackjack =
  "https://media.discordapp.net/attachments/783367484501262377/809799632427155506/STARDUST_BlackJack.jpeg";
module.exports = {
  name: "blackjack",
  aliases: ["blackjack", "bj"],
  async execute(client, message, args, database) {
    var { body } = await snekfetch.get(
      firebase.databaseURL + "/Servidores/Prefixo/" + message.guild.id + ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var prefix;
    if (!body) {
      prefix = 0;
    } else {
      prefix = Number(body.prefixo);
    }
    let prefixo = `${prefix ? prefix : "d!"}`;

    let regexArray = args[0];
    if (!regexArray || regexArray.length < 1) {
      return message.channel.send({
        embed: {
          color: 3447003,
          timestamp: new Date(),
          title: "Modo de Uso",
          description: prefixo + "blackjack `quantidade`"
        }
      });
    }
    var { body } = await snekfetch.get(
      firebase.databaseURL +
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

    var banco;
    if (!body) {
      banco = 0;
    } else {
      banco = Number(body.dindin);
    }

    let quantidade = Number(args[0]);
    let ganhar = quantidade * 1;

    if (dinmão < quantidade)
      return message.channel
        .send(
          emoji.negativo + " | Você não tem dinheiro o suficiente para Apostar"
        )
        .then(m => m.delete(5000));

    if (quantidade < 500) {
      message.channel
        .send(emoji.aviso + " | O valor mínimo para o blackjack é **R$500**")
        .then(m => m.delete(10000));
      return 0;
    }

    if (quantidade > 100000) {
      message.channel
        .send(
          emoji.aviso + " | O valor maximo para o blackjack é **R$ 100.000**, não queremos que perca tanto dinheiro!"
        )
        .then(m => m.delete(10000));
      return 0;
    }

    function BlackJack(bet, callback) {
      this.bet = bet;
      this.deck = new Deck().shuffle();
      this.player = new Hand();
      this.dealer = new Hand();
      this.player.add(this.deck.draw());
      this.player.add(this.deck.draw());
      this.dealer.add(this.deck.draw());

      let blackjackEmbed = new Discord.RichEmbed()
        .setTitle(client.user.username + ` BlackJack`)
        .setDescription(
          "**Como Funciona?** O objetivo é chegar o mais próximo de **21** pontos, caso ultrapasse ou se o bot bater primeiro você irá perder!\n\nDigite: `comprar` para comprar outra carta ou `parar` para passar.\n\nValendo: **" +
            require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) +
            "**"
        )
        .setColor("#ADD8E6")
        .addField(
          `**🧟 ${message.author.username}**`,
          this.player.toString() +
            `\n**Total de pontos:** ${this.player.score()}`,
          true
        )
        .addField(
          `**🧙‍♂️ ${client.user.username}**`,
          this.dealer.toString() +
            `\n\n**Total de pontos:** ${this.dealer.score()}`,
          true
        )
        .setThumbnail(ImgBlackjack)
        .setTimestamp()
        .setFooter(message.author.tag);
      message.channel.send(blackjackEmbed);
      this.dealer.add(this.deck.draw());

      database
        .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
        .set({
          dindin: banco,
          dinheiro: dinmão - quantidade
        });
    }

    // Playing function. 0 = game continues, 1 = player wins, 2 = bot wins
    BlackJack.prototype.play = function(hit, callback) {
      if (hit) {
        this.player.add(this.deck.draw());
        if (this.player.bust()) {
          let s = new Discord.RichEmbed()
            .setTitle(client.user.username + ` BlackJack`)
            .setDescription("Você perdeu **" + require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) + "**. O resultado final foi:")
            .setColor("#ff0101")
            .addField(
              `**🧟 ${message.author.username}**`,
              this.player.toString() +
                `\n**Total de pontos:** ${this.player.score()}`,
              true
            )
            .addField(
              `**🧙‍♂️ ${client.user.username}**`,
              this.dealer.toString() +
                `\n\n**Total de pontos:** ${this.dealer.score()}`,
              true
            )
             .setImage(ImgBlackjack)
            .setThumbnail(ImgBlackjack)
            .setTimestamp();
          return callback(2, s);
        } else {
          let s = new Discord.RichEmbed()
            .setTitle(client.user.username + ` BlackJack`)
            .setDescription(
              "**Como Funciona ?** O objetivo é chegar o mais próximo de **21** pontos, caso ultrapasse ou se Diana bater primeiro você irá perder!\n\nDigite: `comprar` para comprar outra carta ou `parar` para passar.\n\nValendo: **" +
                require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) +
                "**"
            )
            .setColor("#ADD8E6")
            .addField(
              `**🧟 ${message.author.username}**`,
              this.player.toString() +
                `\n**Total de pontos:** ${this.player.score()}`,
              true
            )
            .addField(
              `**🧙‍♂️ ${client.user.username}**`,
              this.dealer.toString() +
                `\n\n**Total de pontos:** ${this.dealer.score()}`,
              true
            )
             .setThumbnail(ImgBlackjack)
            .setTimestamp()
            .setFooter(message.author.tag);
          return callback(0, s);
        }
      } else {
        if (this.dealer.score() > this.player.score() && !this.dealer.bust()) {
          let s = new Discord.RichEmbed()
            .setTitle(client.user.username + ` BlackJack`)
            .setDescription("Você perdeu **" + require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) + "**. O resultado final foi:")
            .setColor("#ff0101")
            .addField(
              `**🧟 ${message.author.username}**`,
              this.player.toString() +
                `\n**Total de pontos:** ${this.player.score()}`,
              true
            )
            .addField(
              `**🧙‍♂️ ${client.user.username}**`,
              this.dealer.toString() +
                `\n\n**Total de pontos:** ${this.dealer.score()}`,
              true
            )
             .setImage(ImgBlackjack)
            .setThumbnail(ImgBlackjack)
            .setTimestamp()
            .setFooter(message.author.tag);
          return callback(2, s);
        }
        while (
          !this.dealer.bust() &&
          this.dealer.score() <= this.player.score()
        ) {
          this.dealer.add(this.deck.draw());
          let s = new Discord.RichEmbed()
            .setTitle(client.user.username + ` BlackJack`)
            .setDescription("Bot comprou um cartão.")
            .setColor("#ADD8E6")
            .addField(
              `**🧟 ${message.author.username}**`,
              this.player.toString() +
                `\n**Total de pontos:** ${this.player.score()}`,
              true
            )
            .addField(
              `**🧙‍♂️ ${client.user.username}**`,
              this.dealer.toString() +
                `\n\n**Total de pontos:** ${this.dealer.score()}`,
              true
            )
            .setThumbnail(ImgBlackjack)
            .setTimestamp();

          if (this.dealer.bust()) {
            s = new Discord.RichEmbed()
              .setTitle(client.user.username + ` BlackJack`)
              .setDescription("Você ganhou **" + require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) + "**, o resultado final foi:")
              .setColor("#01ff45")
              .addField(
                `**🧟 ${message.author.username}**`,
                this.player.toString() +
                  `\n**Total de pontos:** ${this.player.score()}`,
                true
              )
              .addField(
                `**🧙‍♂️ ${client.user.username}**`,
                this.dealer.toString() +
                  `\n\n**Total de pontos:** ${this.dealer.score()}`,
                true
              )
               .setImage(ImgBlackjack)
              .setThumbnail(ImgBlackjack)
              .setTimestamp()
              .setFooter(message.author.tag);

            database
              .ref(
                "Servidores/Banco/" + message.guild.id + "/" + message.author.id
              )
              .once("value")
              .then(async function(snap) {
                database
                  .ref(
                    "Servidores/Banco/" +
                      message.guild.id +
                      "/" +
                      message.author.id
                  )
                  .set({
                    dindin: banco,
                    dinheiro: dinmão + ganhar
                  });
              });
            return callback(1, s);
          }

          if (
            !this.dealer.bust() &&
            this.dealer.score() > this.player.score()
          ) {
            s = new Discord.RichEmbed()
              .setTitle(client.user.username + ` BlackJack`)
              .setDescription("Você perdeu **" + require("currency-formatter").format(quantidade, { code: "de-DE", symbol: "R$ ", precision: 0}) + "**. O resultado final foi:")
              .setColor("#ff0101")
              .addField(
                `**🧟 ${message.author.username}**`,
                this.player.toString() +
                  `\n**Total de pontos:** ${this.player.score()}`,
                true
              )
              .addField(
                `**🧙‍♂️ ${client.user.username}**`,
                this.dealer.toString() +
                  `\n\n**Total de pontos:** ${this.dealer.score()}`,
                true
              )
              .setImage(ImgBlackjack)
              .setThumbnail(ImgBlackjack)
              .setTimestamp()
              .setFooter(message.author.tag);
            return callback(2, s);
          }
        }
      }
    };

    if (!bjGames[message.author.id]) {
      bjGames[message.author.id] = new BlackJack();
      const filter = m => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(filter);
      collector.on("collect", m => {
        if (m.content.toLowerCase() === "comprar") {
          bjGames[message.author.id].play(true, function(status, string) {
            if (status == 0) {
              message.channel.send(string);
            }
            if (status == 2) {
              message.channel.send(string);
              delete bjGames[message.author.id];
              collector.stop();
            }
          });
        } else if (m.content.toLowerCase() === "parar") {
          bjGames[message.author.id].play(false, function(status, string) {
            if (status == 1) {
              message.channel.send(string);
              delete bjGames[message.author.id];
              collector.stop();
            }
            if (status == 2) {
              message.channel.send(string);
              delete bjGames[message.author.id];
              collector.stop();
            }
          });
        } else {
          return;
        }
      });
    } else {
      message.channel.send(
          "**🧙‍♂️ | Você já está jogando! Termine o jogo atual antes de iniciar outro!**"
      );
    }
  }
};
