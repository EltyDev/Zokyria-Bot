const config = require("./config.json");
const discord = require("discord.js");
const axios = require("axios");
const bot = new discord.Client();
var joueur = 0

function verifieJoueur() {

	axios.get("https://api.mcsrvstat.us/1/astiria.minesr.com").then(res => {

		if (res.data && res.data.players) {

			let joueurCo = res.data.players.online || 0;
			let joueurMax = res.data.players.max || 15;
			bot.user.setPresence({ game: { name: `astiria.minesr.com | ${joueurCo}/${joueurMax}`, type: 0 } });

		}
	
	})

}

bot.on("ready", () => {
  
  console.log(`${bot.user.tag} connecté !`);
  verifieJoueur();
  setInterval(verifieJoueur, 20000);

})

bot.on("guildMemberAdd", (member) => {

	member.guild.channels.get('677704967875985409').send(`>>> __**Bienvenue**__\nBienvenue ${member} sur Astiria.`);

})

bot.login(config.token);