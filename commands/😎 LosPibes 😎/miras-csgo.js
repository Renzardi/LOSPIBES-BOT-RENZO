const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "miras-csgo",
    category: "😎 LosPibes 😎",
    aliases: ["m-cs"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{

      if(!args[0])
      return message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter("Usa el comando /help para informacion general")
          .setTitle(`👉🏻 CSGO | Miras Acutuales`)
          .setDescription(">> Preview: https://cdn.discordapp.com/attachments/976268893452632097/976268939715813456/unknown.png\n\n>> Copiar: `CSGO-87vs4-u3SPr-G7JyM-JEMmn-LH5RG`\n\n\n>> Preview: https://cdn.discordapp.com/attachments/976268893452632097/976269325986066433/unknown.png\n\n>> Copiar: `CSGO-Yxbi3-j64nq-HxHaT-zjUS9-zHbEC`\n\n\n>> Preview: https://cdn.discordapp.com/attachments/976268893452632097/976269660620210186/unknown.png\n\n>> Copiar: `CSGO-FTcSx-83sCo-MSr8D-vRztq-9R88F`")
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