const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "search",
    category: "🎵 Musica🎵",
    aliases: ["findtrack"],
    cooldown: 4,
    useage: "search <URL / TITLE>",
    description: "Seraches 10 songs from youtube",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Porfavor ingresa a un canal de voz!`)
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
          .setTitle(`❌ ERROR | Busqueda invalida`)
          .setDescription(`Usa: \`${prefix}search <URL / TITLE>\``)
        );
      let result = await client.distube.search(args.join(" "));
      let searchresult = "";
      for(let i =0; i < 10; i++){
        try{
          searchresult += `**${i+1}.** [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`
        }catch{
          searchresult = "\n";
        }
      }
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | LOS PIBES BOT",client.user.displayAvatarURL())
        .setTitle(`Resultados: ${args.join(" ")}`.substr(0, 256))
        .setDescription(searchresult.substr(0, 2048))
      ).then(msg=>{
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["time"]}).then(collected =>{
          let userinput = collected.first().content;
          if(Number(userinput) <= 0 && Number(userinput) > 10){
            message.reply("Numero Invalido")
            userinput = 0;
          }
          client.distube.play(message, result[userinput - 1].url);
        }).catch(e=>{
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username + " | LOS PIBES BOT", client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | Ocurrio un error`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
          );
        })
      })
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
