module.exports = client => {
  console.log(
    `${client.guilds.size} servidores | ${client.users.size} usuarios`
  );

  /*
   * TROCA DE AVATAR
   */

  setInterval(() => {
    let random_avatar = [
      "https://media.discordapp.net/attachments/783367484501262377/806594898706563112/MlD627jIwJ7ABiUfq9Q4UWubpSTF_5abfyFk5iecCxP979GHeYFna1Rq3Hs52QPNF-XbLNOwgm1F8Cf0kuVnDKsMPCcQz3ik6Mcc.png?width=395&height=473",
      "https://media.discordapp.net/attachments/783367484501262377/806594869370814484/RIMfNkF4Ac6Dxr_49Ruous8smB0jesEeU-YkfwGMJWA9yQo7U5cqQDEgpBU6YTiT5R-LRLOlmltQom_z-_5BRa2ruHbDfK4XPuad.png?width=411&height=473",
      "https://media.discordapp.net/attachments/796771511553097738/813384032070664192/unknown.png",
      "https://media.discordapp.net/attachments/796771511553097738/813531232197148682/unknown.png?width=529&height=473"
      
    ];

    client.user.setAvatar(
      random_avatar[Math.floor(Math.random() * random_avatar.length)]
    );
  }, 30 * 60000);

  const firebase = require("firebase");
  const database = firebase.database();

  database
    .ref(`Owner`)
    .once("value")
    .then(async function(mdk) {
      if (mdk.val() == null) {
        database.ref(`Owner`).set({
          game: 0,
          qtdcmd: 0,
          embed: 3684413,
          delete: 10,
          cooldown: 3,
          suporte: 0,
          permissão: 3198025,
          criador: 0,
          tokenbot: 0,
          antifake: 10,
          mendreik: 0,
          diana: 0,
          positivo: 0,
          negativo: 0,
          aviso: 0,
          relogio: 0,
          dinheiro: 1,
          seta: 0,
          lixo: 0,
          um: 0,
          dois: 0,
          tres: 0,
          quatro: 0,
          cinco: 0,
          seis: 0,
          sete: 0,
          oito: 0,
          nove: 0
        });
      }
      database.ref(`Owner`).update({
        qtdcmd: (mdk.val().qtdcmd = 0)
      });
    });

  /*
   * STATUS DO BOT
   */

  setInterval(async function() {
    const Servidor = "";
    const promises = [
      client.shard.broadcastEval("this.users.size"),
      client.shard.broadcastEval("this.guilds.size")
    ];

    Promise.all(promises).then(async results => {
      const membrosall = results[0].reduce((a, b) => a + b, 0);
      const servidoresall = results[1].reduce((a, b) => a + b, 0);

      client.user.setGame(require("currency-formatter").format(membrosall, { code: "de-DE", precision: 0}) + " Humanos");
      client.guilds
        .get(Servidor)
        .channels.get("806613344055197696")
        .setName(require("currency-formatter").format(membrosall, { code: + "de-DE", precision: 0}) + " Usuários 👥");
      client.guilds
        .get(Servidor)
        .channels.get("806613483822383114")
        .setName(require("currency-formatter").format(servidoresall, { code: "de-DE", precision: 0}) + " Servidores 🏠");
    });
  }, 5 * 60000);
};
