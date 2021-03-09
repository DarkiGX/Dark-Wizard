const { ShardingManager } = require("discord.js");
const terminal = require("chalk");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  token: require("./config.json").token
});

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.login("./config.json"); //Ligando o Bot caso ele consiga acessar o token

manager.spawn()