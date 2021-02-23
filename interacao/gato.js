const superagent = require("superagent");

module.exports = {
  name: "gato",
  aliases: ["gato", "cat"],
  async execute(client, message, args, database, mdk) {
    const { body } = await superagent.get("http://aws.random.cat/meow");
    message.channel.send({ file: body.file });
  }
};
