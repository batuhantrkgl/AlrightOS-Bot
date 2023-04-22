const { MessageEmbed } = require('discord.js');
const db = require('orio.db')

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    if (!message) return;
    const deletedMessageEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Message Deleted!')
      .addField('Message:', message.content)
      .addField('Sent by:', message.author.tag)
      .setTimestamp();

    const log_channel = message.client.channels.cache.get(`${db.get("messageDelete_log_channel")}`); // Kanal ID'sini girin
    log_channel.send({ embeds: [deletedMessageEmbed] });
  },
};