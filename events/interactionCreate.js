module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} Adlı Kişi #${interaction.channel.name} Kanalında Komut Kullandı!`);
	},
};