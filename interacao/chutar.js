const emoji = require("../emoji.json");

module.exports = {
  name: "chutar",
  aliases: ["chutar", "kick"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para chutar")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode chutar a si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "http://3.bp.blogspot.com/_C50fSec_vyI/TVHxUip8CbI/AAAAAAAAAgs/sXpk7tp_K1g/s1600/Silva_kicks_faceMMA.gif",
      "https://i.giphy.com/media/Ijk7xicc2aPAI/giphy.webp",
      "http://2.bp.blogspot.com/-c3yOzm6iCaA/VgG4l-OIZjI/AAAAAAAADBo/43o1L7j-4cE/s1600/tumblr_lqk1c2F2Da1r2nuu6o1_500.gif",
      "http://sextoround.com.br/wp-content/uploads/2017/03/tumblr_omorxwb1ac1udfb8oo1_500.gif",
      "http://pa1.narvii.com/6347/1591686ef4fdc1172d8b9713d0fabd55b3e43942_00.gif",
      "http://66.media.tumblr.com/tumblr_lmg4tfseuq1qhzyzho1_500.gif",
      "http://3.bp.blogspot.com/-z85BVK1l4f8/Ug5jh9uakMI/AAAAAAAABSA/1TH0m9KqT8M/s1600/vaca-chutando-cara.gif",
      "https://media1.tenor.com/images/bdb051282c5702a26e7db24f83e753f9/tenor.gif",
      "https://abrilsuperinteressante.files.wordpress.com/2018/07/chutenosaco.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Chutando",
        description: `**${message.author} chutou o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
