const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Yeni bir destek talebi açar.'),

  async execute(interaction) {
    const guild = interaction.guild;
    const member = interaction.member;
    const args = interaction.options.data;

    // ticket kategorisi oluşturulur
    let category = await guild.channels.create('Tickets', {
      type: 'GUILD_CATEGORY',
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: member.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
        {
          id: '1085551863354638426',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
        {
          id: '1085560662861828126',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
      ],
    });

    // ticket kanalı oluşturulur
    let channel = await guild.channels.create(`ticket-${member.user.username}`, {
      type: 'GUILD_TEXT',
      parent: category,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: member.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
        {
          id: '1085551863354638426',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
        {
          id: '1085560662861828126',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
        },
      ],
    });

    // ticket mesajı oluşturulur
    let embed = new MessageEmbed()
      .setTitle('Destek Talebi')
      .setColor('BLUE')
      .setDescription(`Destek talebiniz açıldı. En kısa sürede sizinle iletişime geçeceğiz.`)
      .setTimestamp();

    if (args.reason) {
      embed.addField('Konu', args.reason.value);
    }

    let closeButton = new MessageButton()
      .setCustomId('close_ticket')
      .setLabel('Kapat')
      .setStyle('DANGER');

    let buttonRow = new MessageActionRow().addComponents(closeButton);

    let ticketMessage = await channel.send({ embeds: [embed], components: [buttonRow] });
    await interaction.reply("created ticket, check channels.")
    const filter = (button) => {
      return button.customId === 'close_ticket' && button.user.id === member.id;
    };

    const collector = channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (button) => {
      if (button.customId === 'close_ticket') {
        await channel.delete();
        collector.stop();
      }
    });

    collector.on('end', async (collected) => {
      if (collected.size === 0) {
        await channel.delete();
      }
    });
  },
};