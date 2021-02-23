const ms = require("parse-ms");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const firebase = require("../firebase.json");
const emoji = require("../emoji.json");
let TempoCollector = 15;
let agencia = new Set();
const Tempo = 300 * 60000; //5 Horas

module.exports = {
  name: "empregos",
  aliases: ["empregos", "jobs", "profissões", "trabalhos"],
  async execute(client, message, args, database, mdk) {
    const um = "Lixeiro";
    const dois = "Jornaleiro";
    const tres = "Sorveteiro";
    const quatro = "Fotográfo";
    const cinco = "GogoBoy";
    const seis = "Barman";
    const sete = "Taxista";
    const oito = "Transportador";
    const nove = "Motorista Particular";
    const dez = "Petroleiro";
    const onze = "Transportador de Drogas";
    const doze = "Mecânico";
    const treze = "Bombeiro";
    const quatorze = "Terrorista";
    const quinze = "Assassino";
    const dezesseis = "Chefe da Mafia";
    const dezessete = "Advogado";
    const dezoito = "Polícia Militar";
    const dezenove = "Delegado";
    const vinte = "Motorista de Carro Forte";

    const lum = "1";
    const ldois = "5";
    const ltres = "10";
    const lquatro = "15";
    const lcinco = "20";
    const lseis = "25";
    const lsete = "30";
    const loito = "35";
    const lnove = "40";
    const ldez = "45";
    const lonze = "50";
    const ldoze = "60";
    const ltreze = "70";
    const lquatorze = "80";
    const lquinze = "90";
    const ldezesseis = "100";
    const ldezessete = "120";
    const ldezoito = "140";
    const ldezenove = "160";
    const lvinte = "200";

    const sum = "700";
    const sdois = "900";
    const stres = "1100";
    const squatro = "1250";
    const scinco = "1400";
    const sseis = "1500";
    const ssete = "1750";
    const soito = "1900";
    const snove = "2100";
    const sdez = "2450";
    const sonze = "2700";
    const sdoze = "2850";
    const streze = "3000";
    const squatorze = "3200";
    const squinze = "3500";
    const sdezesseis = "3700";
    const sdezessete = "4000";
    const sdezoito = "4500";
    const sdezenove = "5000";
    const svinte = "6500";

    const empregotext = "Emprego";
    const leveltext = "Level";
    const salariotext = "R$";

    message.channel
      .send({
        embed: {
          color: 3447003,
          title: "Agência de Empregos",
          description:
            "➡ | Digite o número da Profissão que deseja entrar: \n\n" +
            "1⃣ - **" +
            empregotext +
            ":** " +
            um +
            " | **" +
            leveltext +
            ":** " +
            lum +
            " - **" +
            salariotext +
            "** " +
            sum +
            "\n" +
            "2⃣ - **" +
            empregotext +
            ":** " +
            dois +
            " - **" +
            leveltext +
            ":** " +
            ldois +
            " - **" +
            salariotext +
            "** " +
            sdois +
            "\n" +
            "3⃣ - **" +
            empregotext +
            ":** " +
            tres +
            " - **" +
            leveltext +
            ":** " +
            ltres +
            " - **" +
            salariotext +
            "** " +
            stres +
            "\n" +
            "4⃣ - **" +
            empregotext +
            ":** " +
            quatro +
            " - **" +
            leveltext +
            ":** " +
            lquatro +
            " - **" +
            salariotext +
            "** " +
            squatro +
            "\n" +
            "5⃣ - **" +
            empregotext +
            ":** " +
            cinco +
            " -**" +
            leveltext +
            ":** " +
            lcinco +
            " - **" +
            salariotext +
            "** " +
            scinco +
            "\n" +
            "6⃣ - **" +
            empregotext +
            ":** " +
            seis +
            " - **" +
            leveltext +
            ":** " +
            lseis +
            " - **" +
            salariotext +
            "** " +
            sseis +
            "\n" +
            "7⃣ - **" +
            empregotext +
            ":** " +
            sete +
            " - **" +
            leveltext +
            ":** " +
            lsete +
            " - **" +
            salariotext +
            "** " +
            ssete +
            "\n" +
            "8⃣ - **" +
            empregotext +
            ":** " +
            oito +
            " - **" +
            leveltext +
            ":** " +
            loito +
            " - **" +
            salariotext +
            "** " +
            soito +
            "\n" +
            "9⃣ - **" +
            empregotext +
            ":** " +
            nove +
            " - **" +
            leveltext +
            ":** " +
            lnove +
            " - **" +
            salariotext +
            "** " +
            snove +
            "\n" +
            "1⃣0⃣ - **" +
            empregotext +
            ":** " +
            dez +
            " - **" +
            leveltext +
            ":** " +
            ldez +
            " - **" +
            salariotext +
            "** " +
            sdez +
            "\n" +
            "1⃣1⃣ - **" +
            empregotext +
            ":** " +
            onze +
            " - **" +
            leveltext +
            ":** " +
            lonze +
            " - **" +
            salariotext +
            "** " +
            sonze +
            "\n" +
            "1⃣2⃣ - **" +
            empregotext +
            ":** " +
            doze +
            " - **" +
            leveltext +
            ":** " +
            ldoze +
            " - **" +
            salariotext +
            "** " +
            sdoze +
            "\n" +
            "1⃣3⃣ - **" +
            empregotext +
            ":** " +
            treze +
            " - **" +
            leveltext +
            ":** " +
            ltreze +
            " - **" +
            salariotext +
            "** " +
            streze +
            "\n" +
            "1⃣4⃣ - **" +
            empregotext +
            ":** " +
            quatorze +
            " - **" +
            leveltext +
            ":** " +
            lquatorze +
            " - **" +
            salariotext +
            "** " +
            squatorze +
            "\n" +
            "1⃣5⃣ - **" +
            empregotext +
            ":** " +
            quinze +
            " - **" +
            leveltext +
            ":** " +
            lquinze +
            " - **" +
            salariotext +
            "** " +
            squinze +
            "\n" +
            "1⃣6⃣ - **" +
            empregotext +
            ":** " +
            dezesseis +
            " - **" +
            leveltext +
            ":** " +
            ldezesseis +
            " - **" +
            salariotext +
            "** " +
            sdezesseis +
            "\n" +
            "1⃣7⃣ - **" +
            empregotext +
            ":** " +
            dezessete +
            " - **" +
            leveltext +
            ":** " +
            ldezessete +
            " - **" +
            salariotext +
            "** " +
            sdezessete +
            "\n" +
            "1⃣8⃣ - **" +
            empregotext +
            ":** " +
            dezoito +
            " - **" +
            leveltext +
            ":** " +
            ldezoito +
            " - **" +
            salariotext +
            "** " +
            sdezoito +
            "\n" +
            "1⃣9⃣ - **" +
            empregotext +
            ":** " +
            dezenove +
            " - **" +
            leveltext +
            ":** " +
            ldezenove +
            " - **" +
            salariotext +
            "** " +
            sdezenove +
            "\n" +
            "2⃣0⃣ - **" +
            empregotext +
            ":** " +
            vinte +
            " - **" +
            leveltext +
            ":** " +
            lvinte +
            " - **" +
            salariotext +
            "** " +
            svinte,
          footer: {
            icon_url: message.author.avatarURL,
            text: `Você tem apenas ${TempoCollector} segundos para responder`
          },
          thumbnail: {
            url:
              "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/briefcase_1f4bc.png"
          }
        }
      })
      .then(async msg => {
        var emoji;
        msg.delete(TempoCollector * 30000);
        //message.delete(10 * 1000);
        let teste;
        const filter = m => m.author.id === message.author.id;
        const collector = msg.channel.createMessageCollector(filter, {
          time: TempoCollector * 1000
        });
        teste = false;
        collector.on("collect", async m => {
          //m.delete(10 * 1000);
          //m.delete(10 * 1000);
          teste = true;
          if (m.content < 1) return;
          if (m.content > 20) return;
          let quantidadefvc = Number(m.content);
          if (isNaN(m.content)) return;
          if (m.content === m.content) {
            teste = true;
            console.log(m.content);
            if (agencia.has(m.author.id)) {
              //
            } else {
              let Agência;
              if (m.content === "1") Agência = lum;
              if (m.content === "2") Agência = ldois;
              if (m.content === "3") Agência = ltres;
              if (m.content === "4") Agência = lquatro;
              if (m.content === "5") Agência = lcinco;
              if (m.content === "6") Agência = lseis;
              if (m.content === "7") Agência = lsete;
              if (m.content === "8") Agência = loito;
              if (m.content === "9") Agência = lnove;
              if (m.content === "10") Agência = ldez;
              if (m.content === "11") Agência = lonze;
              if (m.content === "12") Agência = ldoze;
              if (m.content === "13") Agência = ltreze;
              if (m.content === "14") Agência = lquatorze;
              if (m.content === "15") Agência = lquinze;
              if (m.content === "16") Agência = ldezesseis;
              if (m.content === "17") Agência = ldezessete;
              if (m.content === "18") Agência = ldezoito;
              if (m.content === "19") Agência = ldezenove;
              if (m.content === "20") Agência = lvinte;

              let Emprego;
              if (m.content === "1") Emprego = um;
              if (m.content === "2") Emprego = dois;
              if (m.content === "3") Emprego = tres;
              if (m.content === "4") Emprego = quatro;
              if (m.content === "5") Emprego = cinco;
              if (m.content === "6") Emprego = seis;
              if (m.content === "7") Emprego = sete;
              if (m.content === "8") Emprego = oito;
              if (m.content === "9") Emprego = nove;
              if (m.content === "10") Emprego = dez;
              if (m.content === "11") Emprego = onze;
              if (m.content === "12") Emprego = doze;
              if (m.content === "13") Emprego = treze;
              if (m.content === "14") Emprego = quatorze;
              if (m.content === "15") Emprego = quinze;
              if (m.content === "16") Emprego = dezesseis;
              if (m.content === "17") Emprego = dezessete;
              if (m.content === "18") Emprego = dezoito;
              if (m.content === "19") Emprego = dezenove;
              if (m.content === "20") Emprego = vinte;

              database
                .ref(
                  `Servidores/Perfil/${message.guild.id}/${message.author.id}`
                )
                .once("value")
                .then(async function(snap) {
                  if (snap.val().level < Agência)
                    return message.channel.send({
                      embed: {
                        color: 3447003,
                        description:
                          "🔔 | Profissão liberada apartir do level " + Agência
                      }
                    });

                  var { body } = await snekfetch.get(
                    firebase.databaseURL +
                      "/Servidores/Profissão/" +
                      message.guild.id +
                      "/" +
                      message.author.id +
                      ".json"
                  );
                  if (body === null) body = "undefined";
                  if (body === "undefined") body = 0;
                  var trabalhotemp = body.trabalhotemp;

                  let time = ms(Tempo - (Date.now() - trabalhotemp));
                  if (
                    trabalhotemp !== null &&
                    Tempo - (Date.now() - trabalhotemp) > 0
                  )
                    return message.channel.send({
                      embed: {
                        color: 3447003,
                        title: message.author.tag,
                        description:
                          "🕛 | Aguarde **" +
                          `${time.hours}h ${time.minutes}m ${time.seconds}s` +
                          " ** para entrar em uma Profissão novamente"
                      }
                    });
                  var { body } = await snekfetch.get(
                    firebase.databaseURL +
                      "/Servidores/Prefixo/" +
                      message.guild.id +
                      ".json"
                  );
                  if (body === null) body = "undefined";
                  if (body === "undefined") body = 0;
                  var prefix = body.prefixo;
                  let prefixo = `${prefix ? prefix : "d!"}`;

                  var { body } = await snekfetch.get(
                    firebase.databaseURL +
                      "/Servidores/Profissão/" +
                      message.guild.id +
                      "/" +
                      message.author.id +
                      ".json"
                  );
                  if (body === null) body = "undefined";
                  if (body === "undefined") body = 0;
                  var trabalhotemp = body.trabalhotemp;
                  var trabalho = body.trabalho;

                  database
                    .ref(
                      `Servidores/Profissão/${message.guild.id}/${message.author.id}`
                    )
                    .set({
                      trabalhotemp: (trabalhotemp = Date.now()),
                      trabalho: (trabalho = m.content)
                    });

                  message.channel.send({
                    embed: {
                      color: 3447003,
                      title: message.author.tag,
                      description:
                        "💼  | Você aderiu a profissão de **" +
                        Emprego +
                        "**, Digite: **" +
                        prefixo +
                        "trabahar** para ganhar seu salário"
                    }
                  });
                });
            }
            agencia.add(m.author.id);
            setTimeout(() => {
              agencia.delete(m.author.id);
            }, TempoCollector * 1000);
          }
          //
        });
      });
  }
};
