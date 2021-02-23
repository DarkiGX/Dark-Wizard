module.exports = {
  name: "saldo",
  aliases: ["saldo", "carteira", "balance"],
  async execute(client, message, args, database) {
    let user =
      message.guild.members.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    let av = "https://loritta.website/assets/img/unknown.png";

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Banco/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var dindin = body.dindin;
    var dinheiro = body.dinheiro;

    var arr = [];
    var counter = 0;
    var pos = 1;
    require("firebase")
      .database()
      .ref()
      .child("Servidores/Banco")
      .child(message.guild.id)
      .once("value", snapshot => {
        snapshot.forEach(v => {
          arr.push({
            ID: v.key,
            dindin: v.val().dindin
          });

          counter++;
          if (counter === snapshot.numChildren()) {
            arr.sort(function(a, b) {
              return b.dindin - a.dindin;
            });
            var msgArr = [];
            var testee = [];
            arr.forEach(u => {
              let abc = pos++;
              if (u.ID !== `${user.id ? user.id : user}`) return;

              msgArr.push(abc);
            });

            const mapping = {
              "0": ":zero:",
              "1": ":one:",
              "2": ":two:",
              "3": ":three:",
              "4": ":four:",
              "5": ":five:",
              "6": ":six:",
              "7": ":seven:",
              "8": ":eight:",
              "9": ":nine:"
            };

            "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
              mapping[c] = mapping[
                c.toUpperCase()
              ] = ` :regional_indicator_${c}:`;
            });

            const membro = client.users.get(`${user.id ? user.id : user}`);

            message.channel.send({
              embed: {
                color: 3447003,
                title: "🧙‍♂️ | " + membro.tag,
                description: `💵 | **Carteira:** ${
                  body
                    ? require("currency-formatter").format(dinheiro, {
                        code: "de-DE",
                        symbol: "R$ ",
                        precision: 0
                      })
                    : "R$ 0"
                } \n🏦 | **Banco:** ${
                  body
                    ? require("currency-formatter").format(dindin, {
                        code: "de-DE",
                        symbol: "R$ ",
                        precision: 0
                      }) +
                      "\n" +
                      `🥇 | **Posição no Rank:**  #️⃣${msgArr
                        .join(" ")
                        .split("")
                        .map(c => mapping[c] || c)
                        .join("")}`
                    : "R$ 0"
                }`,
                thumbnail: {
                  url: user.avatarURL
                },
                footer: {
                  icon_url: message.author.avatarURL,
                  text: message.author.tag
                }
              }
            });
            //
          }
        });
      });
  }
};
