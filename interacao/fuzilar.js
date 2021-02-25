const emoji = require("../emoji.json")

module.exports = {
  name: "fuzilar",
  aliases: ["fuzilar", "atirar", "shoot"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para fuzilar")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode fuzilar a si mesmo, seu suicida")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://media1.tenor.com/images/41bc233b4e2a55cf7c3f748aa7b47c16/tenor.gif?itemid=7286053",
      "https://i.pinimg.com/originals/1c/68/f0/1c68f0f9f5a93038c4d5453d3bd078b1.gif",
      "https://thumbs.gfycat.com/PeskySomberAegeancat-small.gif",
      "https://whatstube.com.br/wp-content/uploads/2016/06/gordo-bom-de-tiro.gif",
      "http://ocatequista.com.br/images/OLDS/uploads/2015/08/fuzilar.gif",
      "https://3.bp.blogspot.com/-iD7272S7Pp4/VTPfAycs3_I/AAAAAAAAE2I/5CAtIuZ1hHI/s1600/robocop%2Bfuzila.gif",
      "https://static.comicvine.com/uploads/original/11113/111131285/5386878-8684255043-giphy.gif",
      "https://lh3.googleusercontent.com/-E-p77lV-3As/WTGFtfwVo7I/AAAAAAAAmu0/k4OHBiwY8ngtt18lJLIL8U6AQ5GbWK13gCJoC/w530-h307-n-rw/r8vZpIm.gif",
      "https://mundomachocom.files.wordpress.com/2018/11/gif.gif?w=371&h=202",
      "https://thumbs.gfycat.com/CorruptIncompleteJay-max-1mb.gif",
      "https://tenor.com/view/shoot-gift-gif-13384546"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Fuzilando",
        description: `**${message.author} fuzilou o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
