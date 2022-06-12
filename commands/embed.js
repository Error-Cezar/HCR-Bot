const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Send an embed')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Title of the embed')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description of the embed')
				.setRequired(true))	
		.addStringOption(option =>
			option.setName('footer')
				.setDescription('Footer of the embed'))
		.addStringOption(option =>
			option.setName('color')
				.setDescription('Color of the embed')),

	async execute(interaction) {
	let con = true
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			await interaction.reply("insufficient permission")
			return
		}
        try {
			let msg = interaction.options.getString("description")
			msg = msg.replaceAll(`\\n`, "\n");
			const hi = await interaction.client.Embed(interaction.options.getString('title'), msg, '', interaction.options.getString('footer'), interaction.options.getString('color'))
			await interaction.reply({embeds: [hi] }).catch((error) => {
				interaction.reply("An error occured while trying to send the embed.");
				console.log(error)
				con = false
				return
			});
			if(con == true) {
		
			}
		} catch(eror) {
	console.log(eror)
		}
		
	},
};
