module.exports = {
  async execute(client, message, args, database, mdk) {
    message.delete();

    if (
      message.author.id !== require("../config.json").criador &&
      message.author.id !== require("../config.json").diana
    )
      return message.channel
        .send("🔔 | Este comando é exclusivo do meu criador!")
        .then(m => m.delete(10000));

    if (!args[0]) return message.channel.send("Insira uma quantidade");
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
            dinheiro: v.val().dinheiro
          });

          counter++;
          if (counter === snapshot.numChildren()) {
            arr.sort(function(a, b) {
              return b.dinheiro - a.dinheiro;
            });
            var top_15 = arr.slice(0, args[0]);
            var msgArr = [];
            var count = 0;
            top_15.forEach(u => {
              msgArr.push(
                `**${pos++} ${client.users.get(
                  u.ID
                )}** - Saldo: **${require("currency-formatter").format(
                  u.dinheiro,
                  { code: "de-DE", symbol: "R$ ", precision: 0 }
                )}**`
              );
              count++;
              if (count == top_15.length) {
                var msg2 = msgArr.join(`\n`);
                message.channel.send("==-== Saldo na Mão ==-==\n\n" + msg2);
              }
            });
          }
        });
      });
  }
};
