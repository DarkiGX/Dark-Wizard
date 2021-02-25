module.exports = {
  name: "casamento",
  aliases: ["casamento", "marriage"],
  async execute(client, message, args) {
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

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Sistema de Casamento (Global)",
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        },
        thumbnail: {
          url: client.user.avatarURL
        },
        fields: [
          {
            value: "👩‍❤️‍👨 | Para se casar",
            name: "**" + prefixo + "casar**"
          },
          {
            value: "💍 | Para ver com quem está casado",
            name: "**" + prefixo + "casado**"
          },
          {
            value: "💔 | Para fazer o seu divórcio",
            name: "**" + prefixo + "divorciar**"
          }
        ]
      }
    });
  }
};
