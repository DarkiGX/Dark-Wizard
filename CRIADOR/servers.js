const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  async execute(client, message, args) {
      message.delete();
    if ((message.author.id !== config.criador))
      return message.reply("Você Não Tem Permissão Para Isso!");

  const server = new Discord.RichEmbed()
    .setTitle("**Lista de Servidores**")
    .setDescription(
      `          \n\nTotal de servers: (${
        client.guilds.size
      }) \n\n${client.guilds
        .map(a => `- ${a.name} ${a.id} (${a.members.size} usuários)`)
        .join(",\n")}`
    )
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp()
    .setColor("00ffb9");

  message.channel.send(server);
  }
};
