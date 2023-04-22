const fs = require('node:fs')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		fs.readdir('./commands', (err, files) => {
  		if (err) {
    		console.error(err);
    		return;
 		 }
  
  		const jsFiles = files.filter(file => file.endsWith('.js'));
  
  		jsFiles.forEach(file => {
    	console.log(` | ${file}`);
  			});
		}); 
		console.log(`================================================================`)
		console.log(`> Discord API connected to ${client.user.tag}...`);
		console.log(`> Coded by @Batuhantrkgl, with helps of AlrightTeam.`)
		console.log(`> GitHub: https://github.com/batuhantrkgl`)
		console.log(`> Repo: https://github.com/batuhantrkgl/AlrightOS-Bot`)
		console.log(`> Telegram: https://t.me/AlrightOS`)
		console.log(`> Telegram (Personal, may not reply.) https://t.me/batuhantrkgl`)
		console.log(`================================================================`)
		console.log(`--> Commands Found (on /commands/ directory):`)

	},
};