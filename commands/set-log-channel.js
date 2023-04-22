const { ApplicationCommandManager, ApplicationCommandBuilder } = require("djs-application-commands");
const Discord = require('discord.js');
const db = require('orio.db');

module.exports = {
	data: new ApplicationCommandBuilder()
  .setName('set-log-channel')
  .setDescription('log channel.')
  .setPermissions(['BAN_MEMBERS'])
  .addStringOption(option =>
      option.setName('log-type')
          .setDescription('the log type, must be interaction_log_channel or messageDelete_log_channel for now.')
          .setRequired(true)
            )
    .addChannelOption(option =>
      option.setName('channel')
          .setDescription('the channel.')
          .setRequired(true)),
	async execute(interaction) {
		const log_channel = interaction.options.getChannel("channel")
    const log_type = interaction.options.getString("log-type")
        let Embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`Interaction Log Channel set as <#${log_channel.id}> `)
        .setFooter(`Batuhantrkgl ♡ Discord.js`)
		await interaction.reply({embeds: [Embed] });
		db.set(log_type, `${log_channel.id}`)
	},
};