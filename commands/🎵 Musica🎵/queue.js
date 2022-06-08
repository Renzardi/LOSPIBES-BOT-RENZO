const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "queue",
    category: "🎵 Musica🎵",
    aliases: ["qu"],
    cooldown: 4,
    useage: "queue",
    description: "Shows the current queue",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a un canal!`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Ocurrio un erorr!`)
          .setDescription(`Intenta una vez mas!`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a **mi** canal primera`)
          .setDescription(`Canal: \`${message.guild.me.voice.channel.name}\``)
        );
      let queue = client.distube.getQueue(message);
      if(!queue)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | No puedo reproducir musica`)
          .setDescription(`La cola esta limpia`)
        );

        let embed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(client.user.username + " | LOS PIBES BOT",client.user.displayAvatarURL())
          .setTitle(`Cola de: ${message.guild.name}`)

        let counter = 0;
        for(let i = 0; i < queue.songs.length; i+=20){
          if(counter >= 10) break;
          let k = queue.songs;
          let songs = k.slice(i, i + 20);
          message.channel.send(embed.setDescription(songs.map((song, index) => `**${index + 1 + counter * 20}** [${song.name}](${song.url}) - ${song.formattedDuration}`)))
          counter++;
        }

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | Ocurrio un error`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
