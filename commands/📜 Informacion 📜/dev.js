const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "dev",
    category: "📜 Informacion 📜",
    aliases: ["de"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{

      if(!args[0])
      return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`⚙️ INFORMACION | Desarrolladores del Bot`)
          .setDescription(`Este bot llamado **LOS PIBES BOT** fue creado en 03/03/22 por el usuario renzo#6226, programado desde 0 hasta donde esta ahora.\n\nIniciando su codigo en VISUAL ESTUDIO CODE[https://code.visualstudio.com/download] y finalizando en un host 24/7 sin lag.\n\n"Espero que les guste mi bot, me pondria muy feliz si lo invitan a sus servidores y conseguir el verificado del bot al estar en 100 servidores!"`)
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