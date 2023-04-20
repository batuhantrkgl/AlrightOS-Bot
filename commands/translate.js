const { SlashCommandBuilder, Choices } = require('@discordjs/builders');
const Discord = require('discord.js');
const translate = require('node-google-translate-skidz')

module.exports = {
    data: new SlashCommandBuilder()
  .setName('translate')
  .setDescription('translate any message you want!')
  .addStringOption(option =>
      option.setName('message-language')
          .setDescription('the language of the message you provided')
          .setRequired(true)
          .addChoices(
                { name: 'English', value: 'en' },
                { name: 'French', value: 'fr' },
                { name: 'Spanish', value: 'es' },
                { name: 'German', value: 'de'},
                { name: 'Italian', value: 'it'},
                { name: 'Turkish', value: 'tr' }
            )
  )
  .addStringOption(option =>
      option.setName('message')
          .setDescription('the message you want to translate')
          .setRequired(true)
  )
  .addStringOption(option =>
      option.setName('output-language')
          .setDescription('the language you want to translate the message into')
          .setRequired(true)
          .addChoices(
                { name: 'English', value: 'en' },
                { name: 'French', value: 'fr' },
                { name: 'Spanish', value: 'es' },
                { name: 'German', value: 'de'},
                { name: 'Italian', value: 'it'},
                { name: 'Turkish', value: 'tr' }
            )
      ),
    async execute(interaction) {

        const source_message = interaction.options.getString("message")
        const source_language = interaction.options.getString("message-language")
        const target_language = interaction.options.getString("output-language")

        translate({
            text: `${source_message}`,
            source: `${source_language}`,
            target: `${target_language}`
        }, async function(result) {
            let Embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Output:`)
                .setDescription(`${result}`)
                .setFooter(`Translated From ${source_language} to ${target_language}`)
                // .addTimestamp()
            await interaction.reply({embeds: [Embed] });
        })
    },
};