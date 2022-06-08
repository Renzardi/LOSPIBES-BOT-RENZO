const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format } = require("../../handlers/functions")
module.exports = {
    name: "autoplay",
    category: "🎵 Musica🎵",
    aliases: ["ap"],
    cooldown: 4,
    useage: "autoplay",
    description: "Toggles Autoplay",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Necesitas estar en un canal de voz`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | No puedo reproducir la musica.`)
          .setDescription(`La cola esta limpia`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor entra a **mi** canal`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | LOS PIBES BOT",client.user.displayAvatarURL())
        .setTitle(`✅ Todo correcto! Ahora estas: ${client.distube.toggleAutoplay(message) ? "ON" : "OFF"}`)
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
