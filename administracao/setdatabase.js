const config = require("../config.json");
const emoji = require("../emoji.json");
const snekfetch = require("snekfetch");
const firebase = require("../firebase.json");
let TempoCollector = 15;
let setdatabase = new Set();

module.exports = {
  name: "setdatabase",
  aliases: ["setdatabase"],
  async execute(client, message, args, database, mdk) {
    message.delete();

    const owner = message.guild.owner.user.id;

    if (
      message.author.id !== owner &&
      message.author.id !== config.criador &&
      message.author.id !== config.diana
    )
      return message.channel.send({
        embed: {
          description:
            emoji.negativo + ` | Apenas <@${owner}> tem essa permissão!`
        }
      });

    message.channel
      .send(
        "Você deseja zerar a Database deste servidor ? \n\n Digite `Sim` ou `Não`"
      )
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
          if (setdatabase.has(m.author.id)) {
            //
          } else {
            if (m.content.toLowerCase() === "sim") {
              const servidor = message.guild.id;
              database.ref(`Servidores/TempoEconomia/${servidor}`).remove();
              database.ref(`Servidores/Armas/${servidor}`).remove();
              database.ref(`Servidores/Ban/${servidor}`).remove();
              database.ref(`Servidores/Caça/${servidor}`).remove();
              database.ref(`Servidores/Pesca/${servidor}`).remove();
              database.ref(`Servidores/Casamento/${servidor}`).remove();
              database.ref(`Servidores/Criminal/${servidor}`).remove();
              database.ref(`Servidores/Cooldown/${servidor}`).remove();
              database.ref(`Servidores/LojaArmas/${servidor}`).remove();
              database.ref(`Servidores/Profissão/${servidor}`).remove();
              database.ref(`Servidores/Prisão/${servidor}`).remove();
              database.ref(`Servidores/Vip/${servidor}`).remove();
              database.ref(`Servidores/Humor/${servidor}`).remove();
              database.ref(`Servidores/Jogos/${servidor}`).remove();
              database.ref(`Servidores/Jogos2/${servidor}`).remove();
              database.ref(`Servidores/Mascote/${servidor}`).remove();
              database.ref(`Servidores/Loja Mascote/${servidor}`).remove();
              database.ref(`Servidores/MascoteTemp/${servidor}`).remove();
              database.ref(`Servidores/Perfil2/${servidor}`).remove();
              database.ref(`Servidores/Perfil/${servidor}`).remove();
              database.ref(`Servidores/Banco/${servidor}`).remove();
              database.ref(`Servidores/UltimaMensagem/${servidor}`).remove();
              database.ref(`Servidores/Call/${servidor}`).remove();
              database.ref(`Gangue/${servidor}`).remove();
              database.ref(`AFK/${servidor}`).remove();

              message.channel.send({
                embed: {
                  color: 3447003,
                  title: message.author.tag,
                  description:
                    emoji.positivo +
                    " A database desse servidor foi deletada com sucesso"
                }
              });
            }

            if (m.content.toLowerCase() === "não") {
              message.channel.send(
                emoji.negativo + " | O comando foi recusado"
              );
            }
            setdatabase.add(m.author.id);
            setTimeout(() => {
              setdatabase.delete(m.author.id);
            }, TempoCollector * 1000);
          }
        });
      });
  }
};
