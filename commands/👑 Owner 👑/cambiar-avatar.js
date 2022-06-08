const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/cambiar-avatar.json");
module.exports = {
    name: "cambiar-avatar",
    category: "👑 Owner 👑",
    aliases: ["ca-vatar"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
        try{

            var ids = ["806747477793177661"]

            let avatarurl = args.join(" ")
            if(!ids.some(ids => message.author.id == ids)) return; 
            if(!avatarurl) return message.reply('Debes poner un enlace.')

            client.user.setAvatar(avatarurl)//ahi estaria cambiando el avatar

            if(!args[0])
              return   message.channel.send('Avatar cambiado! \n\n Nuevo avatar   :\n' + avatarurl).then(m => m.delete(5000))

            let userargs = args.join(" ").split("++");
            let title = userargs[0];
            let desc = userargs.slice(1).join(" ")
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(title ? title : "")
              .setDescription(desc ? desc : "")
            )
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`❌ ERROR | Ocurrio un error, Intenta nuevamente mas tarde.`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
        }
      }