const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows Ping of Bot.'),
	async execute(interaction) {
        let Embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`:ping_pong: | Bot Pingi: ${interaction.client.ws.ping}ms`)
        .setFooter(`Batuhantrkgl ♡ Discord.js`)
		await interaction.reply({embeds: [Embed] });
	},
};