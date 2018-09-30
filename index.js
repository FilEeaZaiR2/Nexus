//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "D|";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`Connexion en cours ... Voici mon prefix : "` + prefix + `"`);
});

client.on("guildMemberAdd", member => {
    const bvn = member.guild.channels.find(m => m.name === "welcome-ciao");
if(!bvn) return;
//var role = member.guild.roles.find("name", "Members");
let regles = member.guild.channels.find("name", "règles");
bvn.send(`Bienvenue ${member}, n'hésites pas à lire les ` + regles + ` pour plus d'informations !`)
})

client.on("guildMemberRemove", member => {
    const logs = member.guild.channels.find(m => m.name === "welcome-ciao");
    if (!logs) return;
const embed = new Discord.RichEmbed()
.setColor('#FE6F01')
.setAuthor(member.user.tag, member.user.avatarURL)
.setTitle("Départ d'un utilisateur")
.addField("Il s'agit de", `[${member.user.tag}]`, true)
.addField(`Nombre de membres après le départ de __${member.user.tag}__`, member.guild.memberCount)
.setFooter(`ID : ${member.user.id} | FilEeaZaiR#1258`)
.setTimestamp()
logs.send({embed})
});

client.on("guildMemberAdd", member => {
    var members = member.guild.roles.find("name", "Guest");

    if(!members) return;

    member.addRole(members)
})
client.on(`message`, message =>{
if(message.content === prefix + "membercount" && message.channel.type != "dm"){

  var mbr_embed = new Discord.RichEmbed()
  .setTitle("Membres")
  .setDescription(`Sur le serveur **${message.guild.name}**, il y a :\n **${message.guild.members.filter(o => o.presence.status === 'online').size}** En Ligne\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Ne pas déranger\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Hors ligne/invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** En Streameur`)
  .addField(`Il y a : **${message.guild.members.filter(member => !member.user.bot).size}** humains`, "** **")
	.addField(`Il y a : **${message.guild.members.filter(member => member.user.bot).size}** bots`, "** **" )
	.addField(`Le propriétaire est : ${message.guild.owner.user.tag}`, `** **`)
  message.channel.send(mbr_embed)
}


if(message.content === prefix + "channelcount" && message.channel.type != "dm"){
  message.channel.send(`Sur le serveur **${message.guild.name}**, il y a **${message.guild.channels.size}** channels vocaux/écrits !`)
}
	
if(message.content.startsWith(prefix + "purge") || message.content.startsWith(prefix + "clear")) {
        let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
        let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
    
        if (!myrole) {
            return message.channel.send(":no_entry:**Je n'ai pas les permissions nécessaires pour effacer un/des message(s)**");
        }
    
        if (!yourole) {
            return message.channel.send(":no_entry:**Vous n'avez pas les permissions nécessaires**");
        }
    
        var suppression = message.content.substr(8);
        if (suppression < 2 || suppression > 10001) {
            return message.reply(":warning:**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 10000**");
        }
        message.channel.bulkDelete(suppression, true).then(ok => {
            message.reply("**Suppression de " + "" + suppression + "" + " messages**")
            .then(message => setTimeout(function(){message.delete()}, 1000))
            .catch(err => console.log(err));
        
    })

}
});
