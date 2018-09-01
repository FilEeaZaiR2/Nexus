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
client.on(`message`, message =>{
if(message.content === prefix + "membercount" && message.channel.type != "dm"){

  var mbr_embed = new Discord.RichEmbed()
  .setTitle("Membres")
  .setDescription(`Sur le serveur **${message.guild.name}**, il y'a :\n **${message.guild.members.filter(o => o.presence.status === 'online').size}** En Ligne\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Ne pas déranger\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Hors ligne/invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** En Streameur`)
  .addField(`Il y'a : **${message.guild.members.filter(member => !member.user.bot).size}** humains`, "** **")
	.addField(`Il y'a : **${message.guild.members.filter(member => member.user.bot).size}** bots`, "** **" )
	.addField(`Le propriétaire est : ${message.guild.owner.user.tag}`, `** **`)
  message.channel.send(mbr_embed)
}


if(message.content === prefix + "channelcount" && message.channel.type != "dm"){
  message.channel.send(`Sur le serveur **${message.guild.name}**, il y'a **${message.guild.channels.size}** channels vocaux/écrits !`)
}
});
