const emoji = require("../emoji.json");
module.exports = {
  name: "voadora",
  aliases: ["voadora", "flyer"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(
          emoji.aviso + " | Você deve mencionar um usuário para dar voadora"
        )
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode dar voadora em si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://thumbs.gfycat.com/FarawayAdmirableIndianabat-max-1mb.gif",
      "https://gifimage.net/wp-content/uploads/2018/06/voadora-gif-6.gif",
      "http://tenso.blog.br/wp-content/2012/11/segunda1.gif",
      "https://pa1.narvii.com/6595/8de014d8c7609d8bd1c8c5fa9109079defbf2ca8_hq.gif",
      "https://2.bp.blogspot.com/-rBszZuvDSLo/WoyH2bE7qbI/AAAAAAAACq0/HD-ZxDYfC1klUx0wxMWjYIEn9uOQmSoGgCLcBGAs/s1600/giphy%2B%25286%2529.gif",
      "https://lh5.ggpht.com/-YQHCanodbQM/UosRGrLTF6I/AAAAAAAAFx0/Be7HaO26m9o/s800/Voadora%2520S%25C3%25A3o%2520Paulina%2520Sheik.gif",
      "https://media1.tenor.com/images/0b6a85eb61a27012ed5b84b7ecc1f446/tenor.gif?itemid=10510291",
      "https://i.gifer.com/embedded/download/WYeT.gif",
      "http://25.media.tumblr.com/tumblr_mdjvcnr9gq1r6wwnro1_500.gif",
      "https://media.giphy.com/media/ONTdpZcfasePe/giphy.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Voadora",
        description: `**${message.author} deu voadora no usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
