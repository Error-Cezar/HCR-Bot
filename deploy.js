const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
// Variables config
const token = process.env.TOKEN
module.exports = {
Deploy(clientId, guildId) {
	return new Promise((resolve, reject) => {
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(`Updating ${command.data.name}`)
	commands.push(command.data.toJSON());
}

let output
const rest = new REST({ version: '9' }).setToken(token);
console.log("[COMMANDS UPDATE] => Sending commands...")
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => {
		console.log('[SUCCESS] => Successfully registered application commands.')
		output = "success"
		resolve(output);
		return output;
	})
	.catch( error => {output = "failed"; console.log(error); reject(output); return output});
    });
}
};