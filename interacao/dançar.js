const emoji = require("../emoji.json");

module.exports = {
  name: "dançar",
  aliases: ["dançar", "dancar", "dance"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para dançar")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode dançar com si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://66.media.tumblr.com/tumblr_ma1fjwMjUl1r6j01po1_400.gif",
      "https://33.media.tumblr.com/11e302d54ebc62c896f55d3676fc57fc/tumblr_mvuz9hSv7x1qbvovho1_500.gif",
      "https://4.bp.blogspot.com/-hoIK5aFaZ1Q/WjaQCwuT3AI/AAAAAAAASBs/N-cuVz2Rd1cllw7iCYckDvLZkuohJZtmgCLcBGAs/s1600/tumblr_otwjjzzm4G1thz9j4o1_500.gif",
      "http://s.glbimg.com/et/nv/f/original/blog/1b9953f2-1776-4dcd-ad29-657383982442_danca_fatinha_bruno.gif",
      "https://i1.wp.com/www.naomesmo.com.br/wp-content/uploads/2016/10/minha-rea%C3%A7%C3%A3o-ao-saber-que-amanha-%C3%A9-sexta-feira.gif",
      "https://www.altoastral.com.br/wp-content/uploads/2016/07/gif-fatima-bernardes-signo-de-touro.gif",
      "http://www.gifs.eco.br/wp-content/uploads/fotos/gif-legal-criancinhas-dancando-70150878.gif",
      "https://i.correiobraziliense.com.br/a2smn4ZqcKiiqwiu4OituIt4neo=/675x/smart/imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2015/03/06/474309/20150306141719118399u.gif",
      "https://2.bp.blogspot.com/--WUoN4AIHnA/WdAQHKKVKgI/AAAAAAAAO3E/CGixIH6Fqx0H54kMFp-ftp4FkpGZospVQCLcBGAs/s640/010.gif",
      "https://68.media.tumblr.com/9d74ed4a08671174731978ff03b25e09/tumblr_nwt0lzQ4nT1uk5m23o2_500.gif"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Dançando 💃🏻",
        description: `**${message.author} dançou com o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
