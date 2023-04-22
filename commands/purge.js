const { ApplicationCommandManager,ApplicationCommandBuilder } = require("djs-application-commands");

module.exports = {
    data: new ApplicationCommandBuilder()
        .setName('clear')
        .setDescription('Deletes the specified number of messages.')
        .setPermissions(['MANAGE_MESSAGES'])
        .addIntegerOption(option => 
            option.setName('count')
                .setDescription('the number of messages will be deleted')
                .setMaxValue(99)
                .setMinValue(1)
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Deletes messages for a specific user')
                .setRequired(false)),
    async execute(interaction) {
        const count = interaction.options.getInteger('count');
        const user = interaction.options.getUser('user');

        if (count < 1 || count > 100) {
            return await interaction.reply({ content: 'The number of messages to be deleted must be between 1 and 100.', ephemeral: true });
        }

        let messages;

        if (user) {
            messages = await interaction.channel.messages.fetch({ limit: count })
                .then(messages => messages.filter(m => m.author.id === user.id));
        } else {
            messages = await interaction.channel.messages.fetch({ limit: count + 1 });
        }

        await interaction.channel.bulkDelete(messages, true);

        return await interaction.reply({ content: `Deleted ${messages.size} messages succesfully.`, ephemeral: true });
    },
};