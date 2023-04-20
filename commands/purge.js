const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Belirtilen sayıda mesajı siler')
        .addIntegerOption(option => 
            option.setName('count')
                .setDescription('Silinecek mesaj sayısı')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Belirli bir kullanıcının mesajlarını siler')
                .setRequired(false)),
    async execute(interaction) {
        const count = interaction.options.getInteger('count');
        const user = interaction.options.getUser('user');

        if (count < 1 || count > 100) {
            return await interaction.reply({ content: 'Silinecek mesaj sayısı 1 ile 100 arasında olmalıdır.', ephemeral: true });
        }

        let messages;

        if (user) {
            messages = await interaction.channel.messages.fetch({ limit: count })
                .then(messages => messages.filter(m => m.author.id === user.id));
        } else {
            messages = await interaction.channel.messages.fetch({ limit: count + 1 });
        }

        await interaction.channel.bulkDelete(messages, true);

        return await interaction.reply({ content: `Başarıyla ${messages.size} mesaj silindi.`, ephemeral: true });
    },
};