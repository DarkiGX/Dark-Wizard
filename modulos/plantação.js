let Tempo = 180 * 60000; // 3 Horas

module.exports = {
  name: "plantação",
  aliases: ["plantação", "plantacao", "plantaçao", "plantacão"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/Servidores/Prefixo/${message.guild.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var Prefixo = `${body.prefixo ? body.prefixo : "d!"}`;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        `/Servidores/Plantação/${message.guild.id}/${message.author.id}` +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var lote1;
    if (!body) {
      lote1 = 0;
    } else {
      lote1 = Number(body.lote1);
    }

    let LOTE1 = lote1;
    if (LOTE1 < 6) LOTE1 = 0;

    var lote2;
    if (!body) {
      lote2 = 0;
    } else {
      lote2 = Number(body.lote2);
    }

    let LOTE2 = lote2 - 2;
    if (LOTE2 < 6) LOTE2 = 0;

    var lote3;
    if (!body) {
      lote3 = 0;
    } else {
      lote3 = Number(body.lote3);
    }

    let LOTE3 = lote3 - 2;
    if (LOTE3 < 6) LOTE3 = 0;

    const time1 = require("parse-ms")(Date.now() - lote1);
    const time2 = require("parse-ms")(Date.now() - lote2);
    const time3 = require("parse-ms")(Date.now() - lote3);

    const ttime1 = lote1 !== null && Tempo - (Date.now() - lote1) > 0;
    const ttime2 = lote1 !== null && Tempo - (Date.now() - lote1) > 0;
    const ttime3 = lote1 !== null && Tempo - (Date.now() - lote1) > 0;

    let temp1 = require("parse-ms")(Tempo - (Date.now() - lote1));
    let temp2 = require("parse-ms")(Tempo - (Date.now() - lote2));
    let temp3 = require("parse-ms")(Tempo - (Date.now() - lote3));

    let a = time1.hours;
    let b = time2.hours;
    let c = time3.hours;

    let aa = time1.seconds;
    let bb = time2.seconds;
    let cc = time3.seconds;

    if (aa > 1) lote1 = `${time1.hours}h ${time1.minutes}m ${time1.seconds}s`;
    if (bb > 1) lote2 = `${time1.hours}h ${time1.minutes}m ${time1.seconds}s`;
    if (cc > 1) lote3 = `${time1.hours}h ${time1.minutes}m ${time1.seconds}s`;

    if (a < 1) lote1 = "🌱";
    if (b < 1) lote2 = "🌱";
    if (c < 1) lote3 = "🌱";
    if (a > 0) lote1 = "🌿";
    if (b > 0) lote2 = "🌿";
    if (c > 0) lote3 = "🌿";
    if (a > 2) lote1 = "🍁";
    if (b > 2) lote2 = "🍁";
    if (c > 2) lote3 = "🍁";

    let AAA;
    let BBB;
    let CCC;
    if (ttime1 == false) AAA = 1;
    if (ttime1 == true) AAA = 0;
    if (ttime2 == false) BBB = 1;
    if (ttime2 == true) BBB = 0;
    if (ttime3 == false) CCC = 1;
    if (ttime3 == true) CCC = 0;

    message.channel.send({
      embed: {
        color: 3447003,
        title: "Lotes de Plantação",
        description:
          "➡ | Após jogar uma semente em suas terras, aguarde o tempo certo para Colher, fique de olho para não estragar. \n\n" +
          `${
            LOTE1
              ? `Status Lote 1 - ` +
                `${
                  AAA
                    ? "Digite: **" + Prefixo + "colher**"
                    : `Tempo Restante: ${temp1.hours}h ${temp1.minutes}m ${temp1.seconds}s`
                }`
              : " "
          } \n ${
            LOTE2
              ? `Status Lote 2 - ` +
                `${
                  BBB
                    ? "Digite: **" + Prefixo + "colher**"
                    : `Tempo Restante: ${temp2.hours}h ${temp2.minutes}m ${temp2.seconds}s`
                }`
              : " "
          } \n ${
            LOTE3
              ? `Status Lote 3 - ` +
                `${
                  CCC
                    ? "Digite: **" + Prefixo + "colher**"
                    : `Tempo Restante: ${temp3.hours}h ${temp3.minutes}m ${temp3.seconds}s`
                }`
              : " "
          }`,
        thumbnail: {
          url:
            "https://pbs.twimg.com/profile_images/1130326351/colheita_400x400.jpg"
        },
        fields: [
          {
            value: `${LOTE1 ? `${lote1}` : "❌"}`,
            name: "឵Lote 1",
            inline: true
          },
          {
            value: `${LOTE2 ? `${lote2}` : "❌"}`,
            name: "឵Lote 2",
            inline: true
          },
          {
            value: `${LOTE3 ? `${lote3}` : "❌"}`,
            name: "឵Lote 3",
            inline: true
          },
          {
            value: `${LOTE1 ? `${lote1}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          },
          {
            value: `${LOTE2 ? `${lote2}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          },
          {
            value: `${LOTE3 ? `${lote3}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          },
          {
            value: `${LOTE1 ? `${lote1}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          },
          {
            value: `${LOTE2 ? `${lote2}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          },
          {
            value: `${LOTE3 ? `${lote3}` : "❌"}`,
            name: "឵ ឵",
            inline: true
          }
        ]
      }
    });
  }
};
