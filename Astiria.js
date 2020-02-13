const config = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();

client.on('ready', () => {
  
  console.log(`${client.user.tag} connecté !`);

})

client.login(config.token);