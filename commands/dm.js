const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Send a message to a specified user')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('Specified user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Message to send')
				.setRequired(true)),

	async execute(interaction) {
	let con = true
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			await interaction.reply("insufficient permission")
			return
		}
        try {
			let msg = interaction.options.getString("message")
			msg = msg.replaceAll(`\\n`, "\n");
			const hi = await interaction.client.Embed("<:HCR:968446284686049280> Hillview County Annoucement <:HCR:968446284686049280>", msg)
			console.log(hi)
			await interaction.options.getUser('member').send({embeds: [hi] }).catch((error) => {
				interaction.reply("An error occured while trying to DM the user.");
				console.log(error)
				con = false
				return
			});
			if(con == true) {
		interaction.reply("User has been DM'ed successfully")
			}
		} catch(eror) {
	console.log(eror)
		}
		
	},
};
