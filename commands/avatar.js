const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows avatar :?')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('the user you wanna get avatar.')
            .setRequired(false)),
    async execute(interaction) {


        const veri = interaction.options.getUser("user") || interaction.user


    let Embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${veri.username} Adlı Kişinin Avatarı`)
        .setImage(veri.avatarURL({dynamic: true, size: 256}) )
        .setFooter({text : `Batuhantrkgl ♡ Discord.js`})
        await interaction.reply({embeds: [Embed]});




      
}   
};