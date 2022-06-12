const mongoose = require("mongoose");
require('dotenv').config()
const DB = process.env.DB
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[BOT] => Starting up.`);
        console.log(`[BOT] => Logged in\nUser: ${client.user.tag}`);
		if(!DB) return
		mongoose.connect(DB, {
			keepAlive: true
		}).then(() => {
            console.log("Successfuly connected to the DataBase.")
		}).catch((error) => {
			console.error(`Couldn't connect to the DataBase\n${error}`)
		})
		client.user.setActivity('Some servers', { type: 'WATCHING' });
	},
};