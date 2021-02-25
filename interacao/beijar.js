const emoji = require("../emoji.json");

module.exports = {
  name: "beijar",
  aliases: ["beijar", "kiss"],
  async execute(client, message, args, database, mdk) {
    let member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);

    if (!args[0])
      return message.channel
        .send(emoji.aviso + " | Você deve mencionar um usuário para beijar")
        .then(m => m.delete(10000), message.delete(10000));

    if (member.id === message.author.id)
      return message.channel
        .send(emoji.negativo + " | Você não pode beijar a si mesmo")
        .then(m => m.delete(10000), message.delete(10000));

    const rando_imgs = [
      "https://i2.wp.com/ww4.sinaimg.cn/mw690/dbb38768jw1eo4rh9bry6g20dw05phbi.gif?quality=85&strip=info",
      "https://i.pinimg.com/originals/6f/c2/5f/6fc25fdd3e22d89b19c3ea76d11789e6.gif",
      "https://ptanime.com/wp-content/uploads/2017/07/Koi-to-uso-GIF3.gif",
      "https://pa1.narvii.com/6680/1f77a0c1a4a10934ebcc0b4d70be8b64967a9133_hq.gif",
      "https://ptanime.com/wp-content/uploads/2017/07/Koi-to-uso-GIF3.gif",
      "http://images5.fanpop.com/image/photos/29000000/Itazura-na-Kiss-itazura-na-kiss-29059617-450-253.gif",
      "http://2.bp.blogspot.com/-951wz6p5l6M/VaIDqdiStBI/AAAAAAAAPO0/gACaGLqnBdQ/s1600/9cbebfb852e76c2b8d9c3b72ae08e68f.gif",
      "http://1.bp.blogspot.com/-jvXhXiCpdJM/T4i30Kv1rHI/AAAAAAAAASM/T6SwbhL9BgU/s1600/tumblr_m1e0c6OziO1qc5wono1_500.gif",
      "https://pa1.narvii.com/6492/1f45fc8dbe9e6e48afa696c8780d623e87e467cb_hq.gif",
      "https://38.media.tumblr.com/tumblr_md3j581bJj1rbll7mo1_500.gif"
    ];
    /*
    database
      .ref(`Servidores/Humor/${message.guild.id}/${message.author.id}`)
      .once("value")
      .then(async function(snap) {
        if (snap.val().felicidade === 100)
          return */ message.channel.send(
      {
        embed: {
          color: 3447003,
          timestamp: new Date(),
          title: "Beijando",
          description: `**${message.author} beijou o usuário ${member.user}**`,
          image: {
            url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
          }
        }
      }
    );
    /*
        if (snap.val().felicidade > 100)
          return message.channel.send({
            embed: {
              timestamp: new Date(),
              color: mdk.val().embed,
              title: "Beijando",
              description: `**${message.author} beijou o usuário ${member.user}**`,
              image: {
                url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
              }
            }
          });

        var felicidade = Math.floor(Math.random() * 5) + 5;

        database
          .ref(`Servidores/Humor/${message.guild.id}/${message.author.id}`)
          .update({
            felicidade: snap.val().felicidade + felicidade
          });

        message.channel.send({
          embed: {
            color: 3447003,
            timestamp: new Date(),
            color: mdk.val().embed,
            title: "Beijando",
            description: `**${message.author} beijou o usuário ${member.user} e ganhou ${felicidade} de felicidade**`,
            image: {
              url: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]
            }
          }
        });
      });*/
  }
};
