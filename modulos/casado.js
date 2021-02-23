const e = {
  positivo: "✅",
  negativo: "❌",
  aviso: "🔔",
  seta1: "➡",
  anel: "💍",
  data: "🗓️",
  tempo: "⏱️"
};

module.exports = {
  name: "casado",
  aliases: ["casado", "married"],
  async execute(client, message, args, database, mdk) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    let av = user.avatarURL || "https://loritta.website/assets/img/unknown.png";

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Prefixo/" +
        message.guild.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefixo = body.prefixo;
    var teste = `${prefixo ? prefixo : "d!"}`;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Casamento/" +
        user.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var casado = body.casado;
    var dataCasamento = body.dataCasamento;
    var datanow = body.datanow;
    const time = require("parse-ms")(Date.now() - datanow);
    let Casado = client.users.get(casado);

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "◆  " + user.tag + "  ◆",
        description: `${
          casado
            ? `${e.anel} | **Casado(a) com:** ${Casado.tag}\n**${
                e.data
              } | Data:** ${dataCasamento} há **${
                casado
                  ? "**" +
                    `${e.tempo} | ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`
                  : " "
              }**`
            : `${e.seta1} | **Digite:** ${teste}casar @membro`
        }`,
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        },
        thumbnail: {
          url: `${
            casado
              ? "https://giphy.com/gifs/love-heart-pretty-iNxi3TWwhwYehzY9IM"
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Broken_heart.svg/1200px-Broken_heart.svg.png"
          }`
        }
      }
    });
  }
};
