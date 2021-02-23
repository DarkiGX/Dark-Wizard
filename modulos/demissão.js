let TempoCollector = 15;
let demissão = new Set();

module.exports = {
  name: "demissão",
  aliases: ["demissão", "demissao", "dismiss"],
  async execute(client, message, args, database, mdk) {
    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Prefixo/" +
        message.guild.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;
    var prefix = body.prefixo;
    let prefixo = `${prefix ? prefix : "d!"}`;

    var { body } = await require("snekfetch").get(
      require("../firebase.json").databaseURL +
        "/Servidores/Profissão/" +
        message.guild.id +
        "/" +
        message.author.id +
        ".json"
    );

    if (body === null) body = "undefined";
    if (body === "undefined") body = 0;

    var trabalho;
    if (!body) {
      trabalho = 0;
    } else {
      trabalho = Number(body.trabalho);
    }

    if (trabalho === 0)
      return message.channel.send(
        "🔔 | Você não possui nenhum emprego, digite: **" +
          prefixo +
          "empregos** e entre em algum"
      );

    let profissão = trabalho;
    if (profissão === 1) profissão = "Lixeiro";
    if (profissão === 2) profissão = "Jornaleiro";
    if (profissão === 3) profissão = "Sorveteiro";
    if (profissão === 4) profissão = "Fotográfo";
    if (profissão === 5) profissão = "GogoBoy";
    if (profissão === 6) profissão = "Barman";
    if (profissão === 7) profissão = "Taxista";
    if (profissão === 8) profissão = "Transportador";
    if (profissão === 9) profissão = "Motorista Particular";
    if (profissão === 10) profissão = "Petroleiro";
    if (profissão === 11) profissão = "Transportador de Drogas";
    if (profissão === 12) profissão = "Mecânico";
    if (profissão === 13) profissão = "Bombeiro";
    if (profissão === 14) profissão = "Terrorista";
    if (profissão === 15) profissão = "Assassino";
    if (profissão === 16) profissão = "Chefe da Mafia";
    if (profissão === 17) profissão = "Advogado";
    if (profissão === 18) profissão = "Polícia Militar";
    if (profissão === 19) profissão = "Delegado";
    if (profissão === 20) profissão = "Motorista de Carro Forte";
    if (profissão === 666) profissão = "Filho do '来 Dark haha.#0010";
    /////////////////////////////////////////////////////////////
    message.channel
      .send({
        embed: {
          color: 3447003,
          title: "Pedido de Demissão",
          description:
            "Tem certeza que deseja pedir demissão do seu emprego de **" +
            profissão +
            "** ? \n\n Digite: `Sim` ou `Não`"
        }
      })
      .then(async msg => {
        msg.delete(TempoCollector * 1000);
        let teste;
        const filter = m => m.author.id === message.author.id;
        const collector = msg.channel.createMessageCollector(filter, {
          time: TempoCollector * 1000
        });
        teste = false;
        collector.on("collect", async m => {
          teste = true;
          if (demissão.has(m.author.id)) {
            //
          } else {
            if (m.content.toLowerCase() === "sim") {
              var { body } = await require("snekfetch").get(
                require("../firebase.json").databaseURL +
                  "/Servidores/Profissão/" +
                  message.guild.id +
                  "/" +
                  message.author.id +
                  ".json"
              );

              if (body === null) body = "undefined";
              if (body === "undefined") body = 0;

              var trabalho;
              if (!body) {
                trabalho = 0;
              } else {
                trabalho = Number(body.trabalho);
              }

              if (trabalho === 0)
                return message.channel.send(
                  "🔔 | Você não está empregado no momento!"
                );

              message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    "✅ | Você se demitiu com sucesso e virou **Mendigo**"
                }
              });

              database
                .ref(
                  `Servidores/Profissão/${message.guild.id}/${message.author.id}`
                )
                .remove();
            }

            if (m.content.toLowerCase() === "não") {
              message.channel.send("❌ | O Comando foi cancelado");
            }

            demissão.add(m.author.id);
            setTimeout(() => {
              demissão.delete(m.author.id);
            }, TempoCollector * 1000);
          }
        });
      });
  }
};
