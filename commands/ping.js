const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Botun Pingini Gösterir.'),
	async execute(interaction) {
        let Embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`:ping_pong: | Bot Pingi: ${interaction.client.ws.ping}ms`)
        .setFooter(`Batuhantrkgl ♡ Discord.js`)
		await interaction.reply({embeds: [Embed] });
	},
};