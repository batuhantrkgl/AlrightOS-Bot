const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('gives information about user')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('the user you wanna get information about')
            .setRequired(false)),
    async execute(interaction) {
        const member = interaction.options.getMember('user') || interaction.member;
        const roles = member.roles.cache
            .filter(r => r.id !== interaction.guild.id)
            .map(r => r.toString())
            .join(", ") || "Bu kullanıcının hiç rolü yok.";

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addField("Name", member.user.username)
            .addField("Discriminator", member.user.discriminator)
            .addField("ID", member.user.id)
            .addField("Joined to Server", member.joinedAt.toUTCString())
            .addField("Joined to Discord", member.user.createdAt.toUTCString())
            .addField("Status", member.presence.status || "Offline")
            .addField("Activite", member.presence.activities[0] ? member.presence.activities[0].name : 'None')
            .addField("Roles", roles);
        await interaction.reply({ embeds: [embed] });
    },
};