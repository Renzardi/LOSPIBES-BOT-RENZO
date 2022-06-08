const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invitar-bot",
    category: "📜 Informacion 📜",
    aliases: ["invite"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{

      if(!args[0])
      return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`🤖 INVITA A **LOS PIBES BOT** | A tu servidor...`)
          .setDescription(`Link: https://discord.com/api/oauth2/authorize?client_id=969391377022615552&permissions=8&scope=bot`)
      );

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