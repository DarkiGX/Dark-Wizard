const superagent = require("superagent");

module.exports = {
  name: "cachorro",
  aliases: ["cachorro", "dog"],
  async execute(client, message, args, database, mdk) {
    const { body } = await superagent.get("https://random.dog/woof.json");
    message.channel.send({ file: body.url });
  }
};
