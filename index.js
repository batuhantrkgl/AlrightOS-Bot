const fs = require('fs');
const { Client, Collection, Intents, MessageButton, MessageActionRow  } = require('discord.js');
const { token } = require('./config.json');
const { joinVoiceChannel } = require('@discordjs/voice');

// Create a new client instance
const client = new Client({ intents: 32767});




 client.once('ready', () => {
 	ses = client.channels.cache.get("1092122670205763696")
 	joinVoiceChannel({
 		channelId: ses.id,
 		guildId: ses.guild.id,
 		adapterCreator: ses.guild.voiceAdapterCreator
 	})
   })



client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Something went wrong while loading command, please try again later.', ephemeral: true });
	}
});

client.on("guildMemberAdd", async member => {

	
   member.roles.add('1085551967281086504')
   client.channels.cache.get('1091787729097994320').send({ content: `Welcome <@!${member.user.id}>!`})
   });
   



client.login(token);
