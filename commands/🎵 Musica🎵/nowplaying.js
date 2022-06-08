const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format, createBar } = require("../../handlers/functions")
module.exports = {
    name: "nowplaying",
    category: "🎵 Musica🎵",
    aliases: ["np"],
    cooldown: 4,
    useage: "nowplaying",
    description: "Shows current Track information",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a un canal de voz!`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | No puedo reproducir musica.`)
          .setDescription(`La cola esta limpia`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor entra a **mi** canal primero!`)
          .setDescription(`Canal: \`${message.guild.me.voice.channel.name}\``)
        );
      let queue = client.distube.getQueue(message);
      let track = queue.songs[0];
      console.log(track)
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | LOS PIBES BOT",client.user.displayAvatarURL())
        .setTitle(`Se esta reproduciendo :notes: ${track.name}`.substr(0, 256))
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addField("Views", `▶ ${track.views}`,true)
        .addField("Dislikes", `:thumbsdown: ${track.dislikes}`,true)
        .addField("Likes", `:thumbsup: ${track.likes}`,true)
        .addField("Duracion: ", createBar(queue.currentTime))
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
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
