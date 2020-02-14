const config = require("./config.json");
const discord = require("discord.js");
const bot = new discord.Client();

bot.on('ready', () => {
  
  console.log(`${bot.user.tag} connecté !`);

})



bot.login(config.token);