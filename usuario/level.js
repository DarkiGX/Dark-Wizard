module.exports = {
  async execute(client, message, args, database) {
    let user =
      message.guild.members.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    let av = "https://loritta.website/assets/img/unknown.png";

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Perfil/" +
        message.guild.id +
        "/" +
        `${user.id ? user.id : user}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var xp = body.xp;
    var level = body.level;

    let curxp = xp;
    let curlvl = level;
    let nxtLvlXp = curlvl * 2500;
    let difference = (curxp / nxtLvlXp) * 297;
    let difference2 = nxtLvlXp - curxp;

    var arr = [];
    var counter = 0;
    var pos = 1;
    require("firebase")
      .database()
      .ref()
      .child("Servidores/Perfil")
      .child(message.guild.id)
      .once("value", snapshot => {
        snapshot.forEach(v => {
          arr.push({
            ID: v.key,
            xp: v.val().xp
          });

          counter++;
          if (counter === snapshot.numChildren()) {
            arr.sort(function(a, b) {
              return b.xp - a.xp;
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
                title: "🧙‍♂️ | Level de " + membro.tag,
                description: `⚡ | **Level:** ${
                  body
                    ? require("currency-formatter").format(level, {
                        code: "de-DE",
                        precision: 0
                      })
                    : "0"
                } | ⚗ | **Xp:** ${
                  body
                    ? require("currency-formatter").format(xp, {
                        code: "de-DE",
                        precision: 0
                      }) +
                      "\n" +
                      `🥇 | **Posição no Rank: #️⃣${msgArr
                        .join(" ")
                        .split("")
                        .map(c => mapping[c] || c)
                        .join("")}`
                    : "0"
                } \n ⚡ | *Falta **${
                  difference2 ? difference2 : "0"
                }**xp pra upar de Level*`,
                thumbnail: {
                  url: message.author.avatarURL
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
