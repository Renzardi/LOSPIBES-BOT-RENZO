const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	category: '🛡️ Administracion 🛡️',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('Permisos Insuficientes');
		}
		if (!args[0]) {
			return message.channel.send('Porfavor menciona un usuario!');
		}
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		try {
			await member.kick();
			return message.channel.send(`${member} Fue kickeado!`);
		} catch (e) {
			return message.channel.send('Este usuario no esta en el servidor!');
		}
	},
};