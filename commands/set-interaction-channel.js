const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const db = require('orio.db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-interaction-log')
		.setDescription('sets channel for interaction log.')
		.addChannelOption(option =>
            option.setName('channel')
            .setDescription('the channel you wanna set as interaction-log-channel')
            .setRequired(true)),
	async execute(interaction) {
		const interaction_channel = interaction.options.getChannel("channel")
        let Embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`Interaction Log Channel set as <#${interaction_channel.id}> `)
        .setFooter(`Batuhantrkgl ♡ Discord.js`)
		await interaction.reply({embeds: [Embed] });
		db.set("interaction_log_channel", interaction_channel.id)
	},
};