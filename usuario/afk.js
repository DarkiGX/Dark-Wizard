module.exports = {
  async execute(client, message, args, database, mdk, snap) {
    const msg = args.slice(0).join(" ");
    if (!args[0]) {
      message.channel.send(
        "🔔 | Você deve inserir uma mensagem para ficar AFK"
      );
      return 0;
    }

    if (msg.length > 30) {
      message.channel.send("🔔 | Sua mensagem não deve ter mais que 30 letras");
      return 0;
    }

    let convite = /(invite.io|discord.me|discord.gg)\/(invite)?/gi.test(
      message.content
    );
    if (convite === true) {
      if (message.author.id !== require("../config.json").criador) {
        return;
      }
    }

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/AFK/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var AFKZIN;
    if (!body) {
      AFKZIN = 0;
    } else {
      AFKZIN = Number(body.afk);
    }

    var MSGZIN;
    if (!body) {
      MSGZIN = 0;
    } else {
      MSGZIN = Number(body.msg);
    }

    database.ref("AFK/" + message.author.id).set({
      ID: message.author.id,
      afk: 1,
      msg: msg
    });

    message.channel.send(
      "✅ | " + message.author + " Você definiu o seu status para **AFK**"
    );
  }
};
