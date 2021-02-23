const config = require("../config.json");
const emoji = require("../emoji.json");

module.exports = {
  name: "eval",
  aliases: ["eval"],
  async execute(client, message, args, database, mdk) {
    if (message.author.id !== config.criador)
      return message.channel.send(
        emoji.negativo + " | Este comando é exclusivo do meu criador!"
      );
    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };

    try {
      const code = args.slice(0).join(" ");

      if (code == "getGuild") {
        var id = code
          .split("(")
          .replace("'", "")
          .replace("'", "")
          .replace(")", "");
      }

      if (!args[0])
        return message.channel.send(
          emoji.aviso + " | Você deve inserir algo vacilão"
        );
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });

      message.client.shard
        .broadcastEval('this.guilds.get("' + id + '")')
        .then(r => {
          for (var i = 0; i < r.length; i++) {
            if (r[i] != null) {
              return r[i];
            }
          }
        });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
  }
};
