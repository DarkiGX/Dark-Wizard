const emoji = require("../emoji.json");

module.exports = {
  name: "bater",
  aliases: ["bater", "socar", "hit"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para bater")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode bater em si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "http://img1.ak.crunchyroll.com/i/spire3/23856a273430fc2ac1c6944de758a6951432760725_full.gif",
      "https://i.gifer.com/V7SH.gif",
      "https://24.media.tumblr.com/tumblr_m0itlhg6Gy1r50au6o1_500.gif",
      "https://media.giphy.com/media/LmJ0nf0tOfVzq/giphy.gif",
      "http://1.bp.blogspot.com/-X7gpflSTvUk/UA1Im2SN5wI/AAAAAAAAB9E/CytIRVbsGdM/s1600/4bd26e8240315.gif",
      "http://pa1.narvii.com/6576/e6312551cf18cdd21a2ae9bce59dd58fa7589aca_hq.gif",
      "https://thumbs.gfycat.com/HarmoniousTerribleLamb-small.gif",
      "https://cdn-images-1.medium.com/max/1600/1*-2h89mi0HjHcVY7izV_ZeQ.gif",
      "https://media1.tenor.com/images/d4bac2114e610528fa9970096595825a/tenor.gif?itemid=10720792",
      "http://arquivo.pontoeletronico.me/wp-content/uploads/2013/07/KO.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Batendo",
        description: `**${message.author} bateu no usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
