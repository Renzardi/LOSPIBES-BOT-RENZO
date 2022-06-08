const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "play",
    category: "🎵 Musica🎵",
    aliases: ["p", "playsong", "playtrack"],
    cooldown: 4,
    useage: "play <URL / TITLE>",
    description: "PLays a song from youtube",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a un canal!`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a **mi** canal primera`)
          .setDescription(`Canal: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | El resultado fue invalido`)
          .setDescription(`Uso: \`${prefix}play <URL / TITLE>\``)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | LOS PIBES BOT",client.user.displayAvatarURL())
        .setTitle("Buscando la cancion...")
        .setDescription(`\`\`\`fix\n${text}\n\`\`\``)
      ).then(msg=>msg.delete({timeout: 3000}).catch(e=>console.log(e.message)))
      //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
      if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")){
        getPreview(args.join(" ")).then(result => {
          client.distube.play(message, result.title);
        })
      }
      else if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")){
        getTracks(args.join(" ")).then(result => {
          for(const song of result)
          client.distube.play(message, song.name);
        })
      }
      else {
        client.distube.play(message, text);
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | Ocurrio un error!`)
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
