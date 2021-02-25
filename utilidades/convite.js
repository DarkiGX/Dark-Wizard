const bloqbloq = new Set();

module.exports = {
  name: "convite",
  aliases: ["convite", "convidarbot", "invite"],
  async execute(client, message, args) {
    if (bloqbloq.has(message.author.id)) {
      message.channel
        .send(
          message.author +
            " Aguarde completar **5 Minutos** para executar esse comando novamente!"
        )
        .then(msg => {
          msg.delete(10000), message.delete(10000);
        });
    } else {
      const promises = [
        client.shard.broadcastEval("this.users.size"),
        client.shard.broadcastEval("this.guilds.size")
      ];

      Promise.all(promises).then(async results => {
        const totalmembros = results[0].reduce((a, b) => a + b, 0);
        const totalservidores = results[1].reduce((a, b) => a + b, 0);

        message.author
          .send(
            client.user +
              " é um Bot de RPG focado em Econômia e Interação.\nE está em **" +
              require("currency-formatter").format(totalservidores, {
                code: "de-DE",
                precision: 0
              }) +
              "** servidores, com um total de **" +
              require("currency-formatter").format(totalmembros, {
                code: "de-DE",
                precision: 0
              }) +
              "** usuários;\n\n➡ **Servidor de Suporte:** https://discord.gg/XKqemmQzJs\n➡ **Quer me adicionar em seu servidor? Use esse link:** " +
              "<https://discord.com/oauth2/authorize?client_id=745710146704900157&scope=bot&permissions=67497025>" 
          )
          .then(abc => {
            message.channel.send(
              " 🧙‍♂️ | " + message.author + " enviei o meu convite no seu privado."
            );
          })
          .catch(err => {
            message.channel.send(
              client.user +
                " é um Bot de RPG, jogos, intereção focado em Econômia\nE está em **" +
                require("currency-formatter").format(totalservidores, {
                  code: "de-DE",
                  precision: 0
                }) +
                "** servidores, com um total de **" +
                require("currency-formatter").format(totalmembros, {
                  code: "de-DE",
                  precision: 0
                }) +
                "** usuários;"
            );
          });
      });
      bloqbloq.add(message.author.id);
      setTimeout(() => {
        bloqbloq.delete(message.author.id);
      }, 5 * 60000);
    }
  }
};
