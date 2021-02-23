module.exports = {
  name: "removeblacklist",
  aliases: ["removeblacklist", "removeblack"],
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
        "🔔 | Você deve mencionar um usuário para remover da blacklist"
      );

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

    message.channel.send({
      embed: {
        color: 3447003,
        description: `✅ | O usuário ${user} foi removido da BlackList Global`
      }
    });

    database.ref(`BlackList/${user.id}`).remove();
  }
};
