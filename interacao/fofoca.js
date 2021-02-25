module.exports = {
  async execute(client, message, args, database, config) {
    let user = args[0] || message.guild.members.random().user;
    let user2 = args[1] || message.guild.members.random().user;

    let polemicas = [
      `O usuário \`${user.tag}\` foi flagado(a) fazendo GF com o(a) \`${user2.tag}\` nas call do servidor`,
      `O usuário \`${user.tag}\` foi visto usando couple com o(a) \`${user2.tag}\``,
      `O usuário \`${user.tag}\` foi visto usando conta fake pra farmar dinheiro junto com o(a) \`${user2.tag}\``
      `O usuário \`${user.tag}\` foi flagado(a) fazendo voz de Loli para ganhar nitro do(a) \`${user2.tag}\``,
      `O usuário \`${user.tag}\` foi flagado(a) gemendo para o(a) \`${user2.tag}\` pra ganhar carguinho no servidor`,
      `O usuário \`${user.tag}\` foi flagado(a) scammando o(a) \`${user2.tag}\`, pegou o dinheiro e saiu correndo`
    ];

    let img = [
      "https://braziljournal.s3.amazonaws.com/covers/14b1fbb0-fdff-0000-1631-a614e9b19cd9.jpg?v=1533296654",
      "https://www.vovocambinda.com.br/wp-content/uploads/2018/03/fofoca.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmU6U1b6qhWVOUWNJVG20UgncWTsUA0_shrxTinRvPMmBNAwGH&usqp=CAU",
      "https://abrilsuperinteressante.files.wordpress.com/2012/02/fofoca.png"
    ];

    message.channel.send({
      embed: {
        color: 3447003,
        title: "FOFOCAS",
        description: polemicas[Math.floor(Math.random() * polemicas.length)],
        thumbnail: {
          url: img[Math.floor(Math.random() * img.length)]
        }
      }
    });
  }
};
