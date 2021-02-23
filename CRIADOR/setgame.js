module.exports = {
  name: "setgame",
  aliases: ["setgame"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    if (message.author.id !== require("../config.json").criador)
      return message.channel.send(
        "❌ | Este comando é exclusivo do meu criador!"
      );

    const Game = args.slice(0).join(" ");
    if (!Game)
      return message.channel.send({
        embed: {
          description: "🔔 | Você deve inserir uma mensagem para o meu Status"
        }
      });

    database
      .ref(`Owner`)
      .once("value")
      .then(async function(snap) {
        database.ref(`Owner`).update({
          game: (snap.val().game = Game)
        });
        client.user.setGame(Game, "https://www.twitch.tv/DarkzeraGX");

        message.channel.send("✅ | Meu status foi alterado com sucesso!");
      });
  }
};
