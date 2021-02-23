const emoji = require("../emoji.json");

module.exports = {
  name: "cumprimentar",
  aliases: ["cumprimentar", "greet"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(
          emoji.aviso + " | Você deve mencionar um usuário para cumprimentar"
        )
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode cumprimentar a si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://whatstube.com.br/wp-content/uploads/2016/06/cumprimentando-mulheres-na-frente-da-namorada.gif",
      "https://lh3.googleusercontent.com/-gmKMdy9d9bw/VpXU9vw5vdI/AAAAAAAAHq8/jbe_bTGGjOY/w800-h800/kouhai.gif",
      "https://66.media.tumblr.com/tumblr_m0c5ywiWLl1qgcvsy.gif",
      "http://i.giphy.com/8vc2rMUDjhy6Y.gif",
      "http://i.imgur.com/x0VuDBQ.gif",
      "https://4.bp.blogspot.com/-T3-gEhVpU8M/V41X7I6Qp6I/AAAAAAAAR-A/diMzk4XuxaAtPoNkVjuzsbTqMdW6W3gmQCLcB/s1600/cumprimento.gif",
      "https://whatstube.com.br/wp-content/uploads/2016/10/quando-tento-fazer-tudo-ao-mesmo-tempo.gif",
      "http://www.naomesmo.com/wp-content/uploads/2012/06/gifs_20.gif",
      "https://img.buzzfeed.com/buzzfeed-static/static/2018-02/15/13/asset/buzzfeed-prod-fastlane-01/anigif_sub-buzz-20432-1518720953-16.gif?crop=374:198;74,0",
      "https://poderosasa.files.wordpress.com/2017/08/giphy.gif?w=371"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        timestamp: new Date(),
        title: "Cumprimentando 🤝",
        description: `**${message.author} cumprimentou o usuário ${member.user}**`,
        image: {
          url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
        }
      }
    });
  }
};
