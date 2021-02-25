let Tempo = 90 * 60000;

module.exports = {
  name: "trabalhar",
  aliases: ["trabalhar", "work"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Prefixo/" +
        message.guild.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefix = body.prefixo;
    let prefixo = `${prefix ? prefix : "d!"}`;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/TempoEconomia/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var TempoTrabalho;
    if (!body) {
      TempoTrabalho = 0;
    } else {
      TempoTrabalho = Number(body.tempotrabalho);
    }

    const time = require("parse-ms")(Tempo - (Date.now() - TempoTrabalho));
    if (TempoTrabalho !== null && Tempo - (Date.now() - TempoTrabalho) > 0)
      return message.channel.send({
        embed: {
          color: 3447003,
          title: message.author.tag,
          description:
            "⏰ | Aguarde **" +
            `${time.hours}h ${time.minutes}m ${time.seconds}s` +
            " ** para trabalhar novamente"
        }
      });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Profissão/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var trabalho;
    if (!body) {
      trabalho = 0;
    } else {
      trabalho = Number(body.trabalho);
    }

    if (trabalho === 0)
      return message.channel.send(
        "🔔 | Você não possui nenhum emprego, digite: `" +
          prefixo +
          "empregos` e entre em algum"
      );

    let profissão = trabalho;
    if (profissão === 1) profissão = "Lixeiro";
    if (profissão === 2) profissão = "Jornaleiro";
    if (profissão === 3) profissão = "Sorveteiro";
    if (profissão === 4) profissão = "Fotográfo";
    if (profissão === 5) profissão = "Entregador de Pizza";
    if (profissão === 6) profissão = "Barman";
    if (profissão === 7) profissão = "Taxista";
    if (profissão === 8) profissão = "Transportador";
    if (profissão === 9) profissão = "Motorista Particular";
    if (profissão === 10) profissão = "Petroleiro";
    if (profissão === 11) profissão = "Transportador de Drogas";
    if (profissão === 12) profissão = "Mecânico";
    if (profissão === 13) profissão = "Bombeiro";
    if (profissão === 14) profissão = "Terrorista";
    if (profissão === 15) profissão = "Assassino";
    if (profissão === 16) profissão = "Chefe da Mafia";
    if (profissão === 17) profissão = "Advogado";
    if (profissão === 18) profissão = "Polícia Militar";
    if (profissão === 19) profissão = "Delegado";
    if (profissão === 20) profissão = "Motorista de Carro Forte";
    if (profissão === 666) profissão = "Filho do 'Dark haha.#0010";
    /////////////////////////////////////////////////////////////
    let Salário = trabalho;
    if (Salário === 1) Salário = 700;
    if (Salário === 2) Salário = 900;
    if (Salário === 3) Salário = 1100;
    if (Salário === 4) Salário = 1250;
    if (Salário === 5) Salário = 1400;
    if (Salário === 6) Salário = 1500;
    if (Salário === 7) Salário = 1750;
    if (Salário === 8) Salário = 1900;
    if (Salário === 9) Salário = 2100;
    if (Salário === 10) Salário = 2450;
    if (Salário === 11) Salário = 2700;
    if (Salário === 12) Salário = 2850;
    if (Salário === 13) Salário = 3000;
    if (Salário === 14) Salário = 3200;
    if (Salário === 15) Salário = 3500;
    if (Salário === 16) Salário = 3700;
    if (Salário === 17) Salário = 4000;
    if (Salário === 18) Salário = 4500;
    if (Salário === 19) Salário = 5000;
    if (Salário === 20) Salário = 6500;
    if (Salário === 666) Salário = 1000000;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
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
      .ref("Servidores/Banco/" + message.guild.id + "/" + message.author.id)
      .set({
        dindin: banco,
        dinheiro: dinmão + Salário
      });

    let levelxp = Math.floor(Math.random() * 90) + 50;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Perfil/" +
        message.guild.id +
        "/" +
        message.author.id +
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

    database
      .ref("Servidores/Perfil/" + message.guild.id + "/" + message.author.id)
      .set({
        xp: xp + levelxp,
        level: level,
        mensagens: mensagens,
        ID: message.author.id
      });

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Trabalho",
        description:
          "💵 | Você trabalhou de **" +
          profissão +
          `** e faturou **${require("currency-formatter").format(Salário, {
            code: "de-DE",
            symbol: "R$ ",
            precision: 0
          })}** e mais **${levelxp}** de XP`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      }
    });

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/TempoEconomia/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var TempoCaça;
    if (!body) {
      TempoCaça = 0;
    } else {
      TempoCaça = Number(body.tempocaça);
    }

    var TempoPesca;
    if (!body) {
      TempoPesca = 0;
    } else {
      TempoPesca = Number(body.tempopesca);
    }

    var TempoCrime;
    if (!body) {
      TempoCrime = 0;
    } else {
      TempoCrime = Number(body.tempocrime);
    }

    var TempoRoubar;
    if (!body) {
      TempoRoubar = 0;
    } else {
      TempoRoubar = Number(body.temporoubar);
    }

    var TempoTrabalho;
    if (!body) {
      TempoTrabalho = 0;
    } else {
      TempoTrabalho = Number(body.tempotrabalho);
    }

    database
      .ref(
        "Servidores/TempoEconomia/" + message.guild.id + "/" + message.author.id
      )
      .set({
        tempocaça: TempoCaça,
        tempopesca: TempoPesca,
        tempocrime: TempoCrime,
        temporoubar: TempoRoubar,
        tempotrabalho: (TempoTrabalho = Date.now())
      });
  }
};
