//Importing all needed Commands
const Discord = require("discord.js");
const client = new Discord.Client();
const { MessageButton, MessageActionRow } = require('discord-buttons'); 
require('discord-buttons')(client);
const config = require('./botconfig/config.json')
 //this is the official discord.js wrapper for the Discord Api, which we use!
/// BOT MUSICA BORRAR SI NO FUNCIONA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// BOT MUSICA BORRAR SI NO FUNCIONA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance) //this package is for reading files and getting their inputs
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Enmap = require('enmap');
const fs = require("fs");
const db = require('quick.db');
// TICKETS
// TICKETS

const Distube = require('distube');

client.on("ready", async () => {
  console.log("Bot Liso para ser usado")

  setInterval(async function(){
    const fetch = require("node-superfetch")

    let user = "ElRasta"

    const uptime = await fetch.get(`https://decapi.me/twitch/uptime/${user}`)
    const avatar = await fetch.get(`https://decapi.me/twitch/avatar/${user}`)
    const viewers = await fetch.get(`https://decapi.me/twitch/viewercount/${user}`)
    const title = await fetch.get(`https://decapi.me/twitch/title/${user}`)
    const game = await fetch.get(`https://decapi.me/twitch/game/${user}`)

    const twitch = require("./Schemas/twitchSchema")
    let data = await twitch.findOne({ user: user, titulo: title.body })

    if(uptime.body !== `${user} esta offline`){

      const embed = new Discord.MessageEmbed()
      .setAuthor({ "name": `${user}`, "iconURL": `${avatar.body}` })
      .setTitle(`${title.body}`)
      .setThumbnail(`${avatar.body}`)
      .setURL(`https://www.twitch.tv/${user}`)
      .addField("Juego", `${game.body}`, true)
      .addField("Viewers", `${viewers.body}`, true)
      .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
      .setColor("RANDOM")

      if(!data){
        const newdata = new twitch({
          user: user,
          titulo: `${title.body}`
        })

        return await newdata.save()
      }

      if(data.title === `${title.body}`) return;

      await client.channels.cache.get("973356777368326215").send(({ content: `${user} Esta en directo, anda a **visitarlo**\n\nhttps://www.twitch.tv/${user}`, embeds: [embed] }))

      await twitch.findOneAndUpdate({ user: user }, { titulo: data.body })
    }
  }, 650000)
});

mongoose.connect("mongodb+srv://LosPibesDiscordBot:Renzo891!@lospibesbot.o7mmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a MongoDB correctamente")
}).catch(() => {
  console.log("Ocurrio un error inesperado al conectarse a MongoDB")
})

client.on("message", message => {

  if (message.channel.type === "dm") {

const channelId = '956727992602722304'; ///Id del canal, ponen la id del canal donde quieren que les avise
const channel = client.channels.cache.get(channelId); ///Esto obtiene el canal

const upembed = new Discord.MessageEmbed()///Crea embed
  .setTimestamp()
  .setTitle("Mensaje directo")///titulo del embed
  .addField("Enviado por:", `<@${message.author.id}>`)///muestra quien envio el mensaje
  .setColor("RANDOM")
  .addField("Mensaje: ", message.content)///el contenido del mensaje
  .setFooter("Mensaje al MD");


channel.send(upembed)///embiamos el embed
}
});///cerramos el codigo

// SETUP AUTO ROLE START



// SETUP AUTO ROLE END

// WELCOME MESSAGE START

client.on('guildMemberAdd', (member) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Bienvenido al servidor de: **Los Pibes**")
  .setDescription(`Gracias por uniter a nuestro servidor ${member}.\n\nNo olvides de **verificarte** en el canal de <#973355112087056435> asi podras tener acceso al resto de canales.\n\nTambien lee nuetras **reglas** para evitar ser sancionado en el servidor.\n\nVisita nuestra pagina web para estar informado de todo tipo de informacion la misma es: **https://lospibescomunidad.mk**`)
  .setFooter("Para obtener informacion del panel de comandos usa /help")
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

  client.channels.cache.get('973354875050147850').send(`${member}`, embed)

})

client.on('guildMemberRemove', (member) => {
  
  const embed = new Discord.MessageEmbed()
  .setTitle("Un miembro menos del servidor de: **Los Pibes**")
  .setDescription(`Gracias por todo el tiempo que estuviste en el servidor, ${member}.\n\nTe esperamos en un **futuro**`)
  .setFooter("LosPibes comunidad Bot Oficial")
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

  client.channels.cache.get('973354921493684278').send(`${member}`, embed)

})

// WELCOME MESSAGE END

//  VERIFICACION

client.on("message", (message) => {
  if (message.content !== `${config.comando}`) return;
    const embed = new Discord.MessageEmbed()
    .setTitle("<a:alerta:981337293103177749> VERIFICACION | LOS PIBES")
    .setDescription("Bienvenido al servidor, Clickea el boton y verificate en el servidor!")
    .setColor('#2f3136')
    .setFooter('LOS PIBES 2.0 | BOT')
    
    let verify = new MessageButton()
     .setLabel("VERIFICARSE")
     .setStyle("blurple")
     .setEmoji("981335919674155008")//✅
     .setID("Verify")
  
  
    message.channel.send({
      button: verify,
      embed: embed 
    });
  })

  client.on("ready", () => {
    console.log("SISTEMA DE VERIFICACION LISTO!")
  })
  
  client.on('clickButton', async (button) => {
      if (button.id !== "Verify") return;
      button.reply.send('<a:verifyx2:981334232423075840> Fuiste verificado correctamente!', true)
      const role = button.guild.roles.cache.get(`${config.rolID}`)
      const member = button.clicker.member
      await member.roles.add(role)
  })


// END VERIFY

// TICKET START

// TICKET FIISH

// ADD BOT WELCOME START

client.on('guildCreate', (guild) => {
  let channelToSend;

  guild.channels.cache.forEach((channel) => {
    if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGE")
    ) channelToSend = channel;
  });

  if(!channelToSend) return;

  channelToSend.send(
    new MessageEmbed()
    .setTitle("🎉 LOS PIBES BOT | **Gracias por la invitacion**")
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setDescription("Hola, antes que nada muchas gracias por invitarme a tu servidor.\n\n➡️ Informacion:\n🤖 Prefix:`/`\n🌎 Region:`LatinoAmerica (ARG)`\n🖥️ Web y Soporte:`https://lospibescomunidad.mk`\n🤖 Comandos Iniciales: `/help, /ping, /uptime, /dev, /invitar-bot`")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Para ver el panel de centro de ayuda usa el comando **/help**")
  )
});

// ADD BOT WELCOME END

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events", "distube-handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//login into the bot
client.login(require("./botconfig/config.json").token);

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
