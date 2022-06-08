const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	category: '🛡️ Administracion 🛡️',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send('Permisos insuficientes.');
		}
		if (!args[0]) {
			return message.channel.send('Porfavor menciona un usuario.');
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		const reason = args[1] ? args.splice(1).join(' ') : 'Sin rason';

		try {
			await member.ban({ reason });
			return message.channel.send(`${member} Fue baneado!`);
		} catch (e) {
			return message.channel.send('Este usuario no esta en el servidor!');
		}
	},
};