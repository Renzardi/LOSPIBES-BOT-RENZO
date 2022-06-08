const Discord = require('discord.js')
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    name: "ping",
    category: "📜 Informacion 📜",
    aliases: ["ping"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
 
    let b1 = new disbut.MessageButton()
    .setLabel("**VER PING**")
    .setID("1")
    .setStyle("red")
    .setEmoji("✅")

    let botones = new disbut.MessageActionRow()
    .addComponent(b1)

    let msg = await message.channel.send(`**GRACIAS POR USAR LOS PIBES BOT**`, botones)

    client.on("clickButton", async (button) => {
        if(button.id === "1"){
            await button.reply.defer()
            await msg.edit(`Tu ping es ${client.ws.ping} MS`)
        }
    })
    
  },
};