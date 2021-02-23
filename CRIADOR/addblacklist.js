module.exports = {
  name: "addblacklist",
  aliases: ["addblacklist", "addblack"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    if (
      message.author.id !== require("../config.json").criador &&
      message.author.id !== require("../config.json").diana
    )
      return message.channel.send(
        "❌ | Este comando é exclusivo do meu criador!"
      );

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    }

    if (!args[0])
      return message.channel.send(
        "🔔 | Você deve mencionar um usuário para a blacklist"
      );

    let tempo = Number(args[1]);
    const razão = args.slice(2).join(" ");
    if (!args[2]) return message.channe.send("vc esqueceu do motivo");
    if (razão.length > 30) {
      message.channel.send("🔔 | O motivo não deve ter mais que 30 caracteres");
      return 0;
    }
    let abc = tempo * 60 * 60 * 1000;
    if (isNaN(tempo))
      return message.channel.send("⚠ | Defina o tempo em Dia(s)").then(msg => {
        msg.delete(5000);
      });

    let ms = abc;
    let cd = 24 * 60 * 60 * 1000;
    let ch = 60 * 60 * 1000;
    let cm = 60 * 1000;
    let cs = 1000;
    let days = Math.floor(ms / cd);
    let dms = days * cd;
    let hours = Math.floor((ms - dms) / ch);
    let hms = hours * ch;
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm;
    let seconds = Math.round((ms - dms - hms - mms) / cs);
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    if (hours === 24) {
      days++;
      hours = 0;
    }
    let dateStrings = [];

    if (days === 1) {
      dateStrings.push("1d");
    } else if (days > 1) {
      dateStrings.push(String(days) + "d");
    }

    if (hours === 1) {
      dateStrings.push("1h");
    } else if (hours > 1) {
      dateStrings.push(String(hours) + "h");
    }

    if (minutes === 1) {
      dateStrings.push("1m");
    } else if (minutes > 1) {
      dateStrings.push(String(minutes) + "m");
    }

    if (seconds === 1) {
      dateStrings.push("1s");
    } else if (seconds > 1) {
      dateStrings.push(String(seconds) + "s");
    }

    let dateString = "";
    for (let i = 0; i < dateStrings.length - 1; i++) {
      dateString += dateStrings[i];
      dateString += ", ";
    }
    if (dateStrings.length >= 2) {
      dateString =
        dateString.slice(0, dateString.length - 2) +
        dateString.slice(dateString.length - 1);
      dateString += "e ";
    }

    dateString += dateStrings[dateStrings.length - 1];

    let tempoms = dateString;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/BlackList/${user.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var Tempo;
    if (!body) {
      Tempo = 0;
    } else {
      Tempo = Number(body.tempo);
    }
    var Data;
    if (!body) {
      Data = 0;
    } else {
      Data = Number(body.data);
    }
    var Motivo;
    if (!body) {
      Motivo = 0;
    } else {
      Motivo = Number(body.motivo);
    }

    database.ref(`BlackList/${user.id}`).set({
      tempo: (Tempo = abc),
      data: (Data = Date.now()),
      motivo: (Motivo = razão)
    });

    message.channel.send({
      embed: {
        color: 3447003,
        description: `✅ | O usuário ${user} entrou para a BlackList Global por **${tempoms}**\n**Motivo:** \`${razão}\``
      }
    });
  }
};
