const { MessageEmbed } = require('discord.js');
const db = require("orio.db");

module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Interaction Log')
      .setDescription(`<@${interaction.user.id}> used a command on <#${interaction.channel.id}>`)
      .addField('Interaction ID', interaction.id)
      .addField('Interaction Tipi', interaction.type)
      .setFooter(`ID: ${interaction.user.id}`)
      .setTimestamp();

    const channel = interaction.client.channels.cache.get(`${db.get("interaction_log_channel")}`);
    if (channel) {
      channel.send({ embeds: [embed] });
    }
  },
};