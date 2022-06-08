const Discord = require('discord.js')
const disbut = require('discord-buttons');
const { Message, Client, MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    name: "avatar",
    category: "🌍 Generales 🌍",
    aliases: ["avt"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {


      if(message.author.bot) return; //detecta si es un bot
      let miembro = message.mentions.users.first() //Agarra a la primera menci�n 
      if (!miembro) { //Si no hay menci�n mandara el avatar del autor del mensaje
      const embed = new Discord.MessageEmbed()
          .setImage(`${message.author.displayAvatarURL({dynamic: true, size : 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${message.author.tag}`);
          
      message.channel.send(embed);
      
      } else { //Si hay menci�n dar� el avatar del mencionado.
      const embed = new Discord.MessageEmbed()
          .setImage(`${miembro.displayAvatarURL({dynamic: true, size : 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${miembro.tag}`);
      
      message.channel.send(embed);
      
      }
    
  },
};