const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "coronavirus-datos",
    category: "📜 Informacion 📜",
    aliases: ["cv-datos"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{

        let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
        let data = await res.json();

        return message.channel.send(new MessageEmbed()
        .setTitle('Datos de Coronavirus - Hoy') 
        .setDescription('Recuerda que estos datos son **Mundiales**')
        .addField('Casos', data.cases.toLocaleString(), true)
        .addField('Casos de Hoy', data.todayCases.toLocaleString(), true)
        .addField('Muertes', data.deaths.toLocaleString(), true)
        .addField('Muertes de Hoy', data.todayDeaths.toLocaleString(), true)
        .addField('Situaciones Criticas/Preocupantes', data.critical.toLocaleString(), true)
        .addField('Recuperados', data.recovered.toLocaleString(), true)
        .addField('Provabilidades en un Millon', data.testsPerOneMillion.toLocaleString(), true)
        .addField('Paises Afectados', data.affectedCountries.toLocaleString(), true)
        .setColor('RANDOM')
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