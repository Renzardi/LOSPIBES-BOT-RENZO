const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	category: '🛡️ Administracion 🛡️',
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.channel.send(
				`No tienes permisos para realizar esta funcion, ${message.author.username}`, // returns this message to user with no perms
			);
		}
		if (!args[0]) {
			return message.channel.send('Porfavor seleccion una cantidad de 1 a 100');
		}

		let deleteAmount = parseInt(args[0], 10);

		if (Number.isNaN(deleteAmount)) {
			return message.channel.send('Porfavor selecciona una cantidad de 1 a 100');
		}

		// could use ternary
		if (deleteAmount > 100) {
			deleteAmount = 100;
		} else {
			deleteAmount = parseInt(args[0], 10);
		}

		await message.channel.bulkDelete(deleteAmount, true);

		const embed = new MessageEmbed()
			.setTitle(`${message.author.username}`)
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription(`Se borro correctamente ${deleteAmount}`)
			.setFooter(message.author.username, message.author.displayAvatarURL())
			.setColor('#f2f2f2');
		return message.channel.send(embed);
	},
};