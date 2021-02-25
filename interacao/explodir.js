const emoji = require("../emoji.json");

module.exports = {
  name: "explodir",
  aliases: ["explodir", "explode"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para explodir")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode explodir a si mesmo, seu suicida")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://cdn.discordapp.com/attachments/538367258888503308/539210759654080523/Castiel_destroi_Rafael.gif",
      "https://i1.wp.com/capinaremos.com/wp-content/uploads/sites/2/2017/02/termite.gif?resize=550%2C276",
      "https://media1.tenor.com/images/8cf65e6f5ae90a3bdda8b281be761ae7/tenor.gif?itemid=11722626",
      "https://media.giphy.com/media/ggczdZyALO6Fq/giphy.gif",
      "https://pa1.narvii.com/6268/5f4f0b49f4257efabf25b8fed400b986dba8c841_hq.gif",
      "https://media.giphy.com/media/5VA0xJAPqidQ4/giphy.gif",
      "https://i.imgur.com/VVCtOGV.gif",
      "https://media.giphy.com/media/6hJJsfA5dbO3C/giphy.gif",
      "http://gifs.frankmeeuwsen.com/boom/nuke.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Explodindo",
        description: `**${message.author} explodiu o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
