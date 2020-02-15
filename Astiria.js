const config = require("./config.json");
const discord = require("discord.js");
const axios = require("axios");
const bot = new discord.Client();

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
	let joueur = member.guild.members.filter(member => !member.user.bot).size;
	member.guild.channels.get(config.channel).send(`>>> <:Astiria:676218452125679661> 》**ASTIRIA | BIENVENUE**\nBienvenue à ${member} sur Astiria !\n● Le Discord compte désormais ${joueur} personnes`);

})

bot.login(config.token);
