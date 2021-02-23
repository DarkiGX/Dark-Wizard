const emoji = require("../emoji.json");

module.exports = {
  name: "matar",
  aliases: ["matar", "kill"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para matar")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode matar a si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://cdn.discordapp.com/attachments/536565391800008715/536632241036591104/3411e389cd7f1632a805656143a8f2e2.gif",
      "https://cdn.discordapp.com/attachments/536565391800008715/536632255842484239/d0acc0bb1548f8cc08a1b5bf9400df039fff264f_hq.gif",
      "https://cdn.discordapp.com/attachments/536565391800008715/536632258321448981/Original.gif",
      "https://cdn.discordapp.com/attachments/536565391800008715/536632273198645248/original_1.gif",
      "https://cdn.discordapp.com/attachments/536565391800008715/536632280035229707/f1009e0b75d398cf042a45debeee641a.gif",
      "https://cdn.discordapp.com/attachments/536565391800008715/536633704852750337/tenor.gif",
      "https://2.bp.blogspot.com/-u2IXz4cYzbk/WE9wXeXCGcI/AAAAAAAAX9Q/jC0o73vn61Qk7J5s3G51cIHJdpALaK2zQCLcB/s1600/rih-gif7-1461187781.gif",
      "http://2.bp.blogspot.com/-PNNF7Uovw-g/VcjeTA77lyI/AAAAAAAAKVQ/hhhDwrfMViw/s1600/tiros-deolhoemgravata.gif",
      "https://media3.giphy.com/media/eRnr5dcmEuzpm/source.gif",
      "https://i.gifer.com/6liF.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Matando",
        description: `**${message.author} matou o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
