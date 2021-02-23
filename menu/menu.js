module.exports = {
  name: "menu",
  aliases: ["menu", "ajuda", "help"],
  async execute(client, message, args, database, mdk) {
    require("fs").readdir("./administracao/", (err, administracao) => {
      require("fs").readdir("./economia/", (err, economia) => {
        require("fs").readdir("./interacao/", (err, interação) => {
          require("fs").readdir("./usuario/", (err, usuário) => {
            require("fs").readdir("./jogos/", (err, jogos) => {
              require("fs").readdir("./utilidades/", (err, utilidades) => {
                require("fs").readdir("./modulos/", (err, modulos) => {
                message.channel.send({
                  embed: {
                    color: 3447003, 
                    timestamp: new Date(),
                    title: "Menu de Comandos",
                    description: "[Me Adicione](https://discord.com/oauth2/authorize?client_id=745710146704900157&scope=bot&permissions=67497025)\n [Meu Servidor de Suporte](https://discord.gg/XKqemmQzJs)\n \n",
                    footer: {
                      text: "Executado por: " + message.author.tag
                    },
                    thumbnail: {
                      url: client.user.avatarURL
                    },
                    image: {
                      url:
                        "https://media.discordapp.net/attachments/751483327395135558/806557098069852190/Dark_wizard.png"
                    },
                    fields: [
                      {
                        value: `${administracao
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Administração " + `(${administracao.length})`
                      },
                      {
                        value: `${interação
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Interação " + `(${interação.length})`
                      },
                      {
                        value: `${economia
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Economia " + `(${economia.length})`
                      },
                      {
                        value: `${usuário
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Usuário " + `(${usuário.length})`
                      },
                      {
                        value: `${jogos
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Jogos " + `(${jogos.length})`
                      },
                      {
                        value: `${utilidades
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Utilidades " + `(${utilidades.length})`
                      },
                      {
                        value: `${modulos
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Ações " + `(${modulos.length})`
                      }
                    ]
                  }
                });
              });
            });
          });
        });
      });
    });
  });
  }
};
