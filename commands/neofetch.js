const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('neofetch')
        .setDescription('Displays system information using Neofetch'),
    async execute(interaction) {
        exec('neofetch', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return interaction.reply('An error occurred while executing the command.');
            }
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('System Information')
                .setDescription('```' + stdout + '```');
            interaction.reply({ embeds: [embed] });
        });
    },
};