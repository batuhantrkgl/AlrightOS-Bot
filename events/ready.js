module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		console.log(`Discord API'ı ${client.user.tag} Adlı Kişiye Bağlandı...`);
	},
};