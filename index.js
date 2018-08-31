//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "x.";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`Connexion en cours ... Voici mon prefix : "` + prefix + `"`);
});

client.on("guildMemberAdd", member => {
    const bvn = member.guild.channels.find(m => m.name === "discussion-générale");
if(!bvn) return;
//var role = member.guild.roles.find("name", "Members");
let regles = member.guild.channels.find("name", "règlement");
bvn.send(`Bienvenue ${member}, n'hésite pas à lire le ` + regles + ` pour plus d'informations !`)
})

client.on("guildMemberAdd", member => {
    var members = member.guild.roles.find("name", "Members");

    if(!members) return;

    member.addRole(members)
})
