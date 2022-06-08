const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "datos-servidor",
    category: "📜 Informacion 📜",
    aliases: ["svinfo"],
    cooldown: 2,
    usage: "info",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
        try{

            var server = message.guild; //Definimos server
            let guild = message.guild; //Definimos guild
            let verifLevels = [
                "Ningúno",
                "Bajo",
                "Medio",
                "(╯°□°）╯︵  ┻━┻",
                "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
              ],// Etos son los niveles de verificación del servidor
              region = {
                europe: "Europa :flag_eu:",
                brazil: "Brasil :flag_br: ",
                hongkong: "Hong Kong :flag_hk:",
                japan: "Japón :flag_jp:",
                russia: "Rusia :flag_ru:",
                singapore: "Singapur :flag_sg:",
                southafrica: "Sudáfrica :flag_za:",
                sydney: "Sydney :flag_au:",
                "us-central": "Central US :flag_us:",
                "us-east": "Este US :flag_us:",
                "us-south": "Sur US :flag_us:",
                "us-west": "Oeste US :flag_us:",
                "vip-us-east": "VIP US Este :flag_us:",
                "eu-central": "Europa Central :flag_eu:",
                "eu-west": "Europa Oeste :flag_eu:",
                london: "London :flag_gb:",
                amsterdam: "Amsterdam :flag_nl:",
                india: "India :flag_in:"
              };// Todas las regiones con su bandera en español

            if(!args[0])
              return message.channel.send(new MessageEmbed()

              .setTitle("Datos del Servidor")
              .setThumbnail(server.iconURL)// Muestra el ícono del servidor
              .setAuthor(server.name, server.iconURL)
              .setDescription(
                `_Servidor creado el_ **_${
                  guild.createdAt.toDateString().split(" ")[2]
                }/${guild.createdAt.toDateString().split(" ")[1]}/${
                  guild.createdAt.toDateString().split(" ")[3]
                }_**`
              )// Este sería la fecha de creación del servidor
              .addField(
                "_Dueño del Servidor_",
                "**" +
                  server.owner.user.username +
                  "#" +
                  server.owner.user.discriminator +
                  "**",
                true
              )//Dueño del servidor
              .addField("_ID_:", "**" + server.id + "**")
              .addField(`_Region_:`, `**${region[guild.region]}**`, true)
              .addField("_Miembros_", "**" + server.memberCount + "**", true)//Cantidad de miembros del servidor
              .addField("_Roles_:", "**" + server.roles.size + "**", true)// Cantidad de roles que tiene el servidor
              .addField(
                `_Nivel de verificación_:`,
                `**${verifLevels[guild.verificationLevel]}**`,
                true
              )// Nivel de verificación del servidor
              .setColor(ee.wrongcolor)// Color del embed
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