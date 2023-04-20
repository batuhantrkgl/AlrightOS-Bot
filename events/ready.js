module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		console.log(`Discord API' connected to ${client.user.tag}...`);
	},
};