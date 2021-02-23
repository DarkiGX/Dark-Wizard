module.exports = {
  name: "botinfo",
  aliases: ["botinfo", "infobot"],
  async execute(client, message, args) {
    let ms = client.uptime;
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
      dateStrings.push("**1** dia");
    } else if (days > 1) {
      dateStrings.push("**" + String(days) + "** dias");
    }

    if (hours === 1) {
      dateStrings.push("**1** hora");
    } else if (hours > 1) {
      dateStrings.push("**" + String(hours) + "** horas");
    }

    if (minutes === 1) {
      dateStrings.push("**1** minuto");
    } else if (minutes > 1) {
      dateStrings.push("**" + String(minutes) + "** minutos");
    }

    if (seconds === 1) {
      dateStrings.push("**1** segundo");
    } else if (seconds > 1) {
      dateStrings.push("**" + String(seconds) + "** segundos");
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

    const promises = [
      client.shard.broadcastEval("this.users.size"),
      client.shard.broadcastEval("this.guilds.size")
    ];

    Promise.all(promises).then(async results => {
      const totalmembros = results[0].reduce((a, b) => a + b, 0);
      const totalservidores = results[1].reduce((a, b) => a + b, 0);


      const criador = client.users.get(require("../config.json").criador);

    
      message.channel.send({
        embed: {
          color: 3447003,
          title: "🧙‍♂️ Informações do Bot",
          description: "[Me Adicione](https://discord.com/oauth2/authorize?client_id=745710146704900157&scope=bot&permissions=67497025)\n [Meu Servidor de Suporte](https://discord.gg/XKqemmQzJs)\n \n",
          thumbnail: {
            url: client.user.avatarURL
          },
          fields: [
            {
              value: `**${Math.floor(client.ping)}**ms`,
              name: "📡 | Ping:",
              inline: true
            },
            {
              value: `${dateString}`,
              name: "⏱ | Acordado a:",
              inline: true
            },
            {
              value: `\`\`\`md\n# ${criador.tag}\`\`\``,
              name: "👑 | Meu dono:"
            },
            {
              value: `**${require("currency-formatter").format(totalmembros, {
                code: "de-DE",
                precision: 0
              })}**`,
              name: "👥 | Membros:",
              inline: true
            },
            {
              value: `**${require("currency-formatter").format(
                totalservidores,
                { code: "de-DE", precision: 0 }
              )}**`,
              name: "🌍 | Servidores:",
              inline: true
            },
            {
              value: "**" + client.shard.count + "**",
              name: "🧪 | Shards:",
              inline: true
            },
          ]
        }
      });
    });
  }
};
