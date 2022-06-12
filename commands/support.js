const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Support server of bot.'),

	async execute(interaction) {
        try {
			const hi = await interaction.client.Embed("Bot Support Server", "Have a suggestion, bug report, or just want to join a bot server cuz it's cool?\nJoin our support server for updates and other stuff.\nhttps://discord.gg/cvkzeFVfjJ")
		    interaction.reply({embeds: [hi]})
		} catch(eror) {
	console.log(eror)
		}
		
	},
};
