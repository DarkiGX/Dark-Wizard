module.exports = {
  name: "inventario",
  aliases: ["inventario", "inventário", "inventory", "inv", "bau", "baú"],
  async execute(client, message, args, database, mdk) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Armas/" +
        message.guild.id +
        "/" +
        user.id +
        ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

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

    var Arma;
    if (!body) {
      Arma = 0;
    } else {
      Arma = Number(body.arma);
    }

    if (Arma === 1) Arma = "Revolver 38";
    if (Arma === 2) Arma = "Pistola Desert Eagle";
    if (Arma === 3) Arma = "Escopeta Shotgun";
    if (Arma === 4) Arma = "Fuzil AK-47";

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Inventario/" +
        message.guild.id +
        "/" +
        user.id +
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

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL + "/InvGlobal/" + user.id + ".json"
    );
    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Anel;
    if (!body) {
      Anel = 0;
    } else {
      Anel = Number(body.anelcasamento);
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/Servidores/Plantação/${message.guild.id}/${user.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var maconha;
    if (!body) {
      maconha = 0;
    } else {
      maconha = Number(body.maconha);
    }

    var semente;
    if (!body) {
      semente = 0;
    } else {
      semente = Number(body.semente);
    }

    message.channel.send({
      embed: {
        color: 3447003,
        title: "Inventário de: " + user.tag,
        description:
          `${Anel ? `💍 | Anel de Casamento: ✅` + "\n" : ""}` +
          `${Arma ? `🔫 | ${Arma}: ✅` + "\n" : ""}` +
          `${Armacaça ? `🏹 | Arma de Caça: ✅`+ "\n" : ""}` +
          `${Vara ? `🎣 | Vara de Pesca: ✅` + "\n" : ""}` +
          `${Munição ? "🍬 | Munição: `" + require("currency-formatter").format(Munição, { code: "de-DE", precision: 0}) + "` \n" : ""}` +
          `${Camarao ? "🦐 | Camarão: `" +  require("currency-formatter").format(Camarao, { code: "de-DE", precision: 0}) + "` \n" : ""}` +
          `${Carne ? "🍗 | Carne: `" +  require("currency-formatter").format(Carne, { code: "de-DE", precision: 0}) + "KG` \n" : ""}` +
          `${Peixe ? "🐟 | Peixe: `" +  require("currency-formatter").format(Peixe, { code: "de-DE", precision: 0}) + "KG` \n" : ""}` +
          `${semente ? "🥜 | Sementes: `" +  require("currency-formatter").format(semente, { code: "de-DE", precision: 0}) + "`\n" : ""}` +
          `${maconha ? "🍁 | Maconha: `" +  require("currency-formatter").format(maconha, { code: "de-DE", precision: 0}) + "KG` \n" : ""}`,
        thumbnail: {
          url:
            "https://media.discordapp.net/attachments/652507900522004511/668112038429458465/150px-Locked_Chest.png"
        }
      }
    });
  }
};
