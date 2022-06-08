const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { MessageActionRow, MessageButton } = require('discord-buttons');
module.exports = {
    name: "emoji-id",
    category: "🌍 Generales 🌍",
    aliases: ["e-id"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {

      const name = args.join(" ");
      const emoji = message.guild.emojis.cache.find((r) => r.name === name);
      if (!name) {
        return message.channel.send("Ingresa solo el nombre del emoji, EJEMPLO: tilde");
      }
      if (!emoji) {
        return message.channel.send(
          "Ingresa solo el nombre del emoji, EJEMPLO: tilde"
        );
      }
      message.channel.send(`\`\`\`${emoji}\`\`\``);


  },
};