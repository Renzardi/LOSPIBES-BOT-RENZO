const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "datos-usuario",
    category: "📜 Informacion 📜",
    aliases: ["userinfo"],
    cooldown: 2,
    usage: "info",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
        try{

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

            let status; // Hacemos un let vacio
            switch (user.presence.status) {// Hacemos un switch de la funcion Presencia
                case "online":// En el caso online..
                    status = "🟢 En linea";// hacemos que el status online pase a decir lo siguiente...
                    break;
                case "dnd":// En el caso dnd..
                    status = "⛔ No molestar";// hacemos que el status dnd pase a decir lo siguiente...
                    break;
                case "idle":// En el caso idle..
                    status = "🌙 Ausente";// hacemos que el status idle pase a decir lo siguiente...
                    break;
                case "offline":// En el caso offline..
                    status = "⚪ Desconectado";// hacemos que el status offline pase a decir lo siguiente...
                    break;
            }

            if(!args[0])
              return message.channel.send(new MessageEmbed()

                  .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
           .addFields(// Hacemos nuevas Fields
                {
                    name: "Apodo: ",// Nombre - Titulo - Caso 1
                    value: message.member.nickname ? message.member.nickname : "No tiene apodo", // Si el "user" tiene apodo se envia, si es false / no tiene Se envia diciendo que "No tiene Apodo"
                    inline: true // En linea: SI
                },
                {
                    name: "#️⃣ Tag: ",// Nombre - Titulo - Caso 1
                    value: `#${user.user.discriminator}`,// Del "user" sacamos su tag / discriminador
                    inline: true// En linea: SI
                },
                {
                    name: "🆔 ID: ",// Nombre - Titulo - Caso 1
                    value: user.user.id,// Del "user" sacamos su ID
                },
                {
                    name: "Reciente Actividad: ",// Nombre - Titulo - Caso 1
                    value: status,// Acá se obtiene el estado del "user" con los casos ya dichos y explicado anteriormente.
                    inline: true// En linea: SI
                },
                {
                    name: "Estado: ",// Nombre - Titulo - Caso 1
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",// Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
                    inline: true// En linea: SI
                },
                {
                    name: 'Avatar link: ',// Nombre - Titulo - Caso 1
                    value: `[Pinche Aquí](${user.user.displayAvatarURL()})`// Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
                },
                {
                    name: 'Dato de creacion: ',// Nombre - Titulo - Caso 1
                    value: user.user.createdAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Fecha de entrada al Servidor: ',// Nombre - Titulo - Caso 1
                    value: user.joinedAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de entrada al servidor en donde se envio el mensaje y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Roles del usuario: ',// Nombre - Titulo - Caso 1
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),// Del "user" obtenemos sus roles del server y lo mapeamos tambien lo separamos con una coma ","
                    inline: true// En linea: SI
                }
            )
                  .setTitle(`Datos del Usuario`)
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