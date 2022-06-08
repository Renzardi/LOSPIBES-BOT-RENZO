const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/cambiar-avatar.json");
module.exports = {
    name: "servidores-del-bot",
    category: "👑 Owner 👑",
    aliases: ["sv-bot"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
        try{

            var ids = ["806747477793177661"]


            if(!args[0])
            return message.channel.send(new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Estoy en ${client.guilds.cache.size} Servidor !`)
                .setDescription(`<a:discord:981337291123482624> **SERVIDORES** >>\n\n${client.guilds.cache.map(r => r.name).join(". \n\n")}`)
            );

            let userargs = args.join(" ").split("++");
            let title = userargs[0];
            let desc = userargs.slice(1).join(" ")
            message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
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