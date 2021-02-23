const superagent = require("superagent");

module.exports = {
  name: "pato",
  aliases: ["pato", "duck"],
  async execute(client, message, args, database, mdk) {
    const { body } = await superagent.get("https://random-d.uk/api/v1/random");
    message.channel.send({ file: body.url });
  }
};
