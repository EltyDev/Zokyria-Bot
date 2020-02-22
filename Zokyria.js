const config = require("./config.json");
const discord = require("discord.js");
const axios = require("axios");
const bot = new discord.Client();

function verifieJoueur() {

	axios.get("https://api.mcsrvstat.us/1/play.zokyria.minesr.com").then(res => {

		if (res.data && res.data.players) {

			let joueurCo = res.data.players.online;
			let joueurMax = res.data.players.max;
			bot.user.setPresence({ game: { name: `play.zokyria.minesr.com | ${joueurCo}/${joueurMax}`, type: 0 } });

		}

		else {

			bot.user.setPresence({ game: { name: `play.zokyria.minesr.com | Off`, type: 0 } });
		
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
	member.guild.channels.get(config.channel).send(`>>> <:Zokyria:680466280104460324> 》**ZOKYRIA | BIENVENUE**\nBienvenue à ${member} sur Astiria !\n● Le Discord compte désormais ${joueur} personnes`);

})

bot.on("guildMemberRemove", (member) => {

	let joueur = member.guild.members.filter(member => !member.user.bot).size;
	member.guild.channels.get(config.channel).send(`>>> <:Zokyria:680466280104460324> 》**ZOKYRIA | AUREVOIR**\nAurevoir à ${member} au plaisir de le revoir !\n● Le Discord compte désormais ${joueur} personnes`);
})

bot.on("message", async message => {

if (message.author.bot) return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (command === "suggestion") {

	let argS = "";
	
	for (let arg in args) {
		
		argS += arg;

	}

	message.channel.send(`>>> <:Zokyria:680466280104460324> 》**ZOKYRIA | Suggestion de ${message.author.tag}**\n${argS}`)

}

})
bot.login(config.token);
