const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Send a message to a specified user')
		.addStringOption(option =>
			option.setName('setting')
				.setDescription('setting to change')
				.setRequired(true)
				.addChoices({name: 'Emergency Channel', value: 'Emergency_channel'})
			    .addChoices({name: '911 Channel', value: '911_channel'}))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel to use')
				.setRequired(true)),

	async execute(interaction) {
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			await interaction.reply("insufficient permission")
			return
		}
		const channelObject = interaction.options.getChannel("channel")
		const client = interaction.client
		switch(interaction.options.getString("setting")) {
			case "Emergency_channel":
				if (channelObject.type === 'GUILD_VOICE') {
					await client.updatePhone(interaction.guild, "Emergency", channelObject.id)
					interaction.reply("Setting has been saved.")
				} else return interaction.reply("The channel isn't a voice chat.")
			break;
			case "911_channel":
				console.log(channelObject.type)
				if (channelObject.type === 'GUILD_VOICE') {
					await client.updatePhone(interaction.guild, "Dispatch", channelObject.id)
					interaction.reply("Setting has been saved.")
				} else return interaction.reply("The channel isn't a voice chat.")
			break;
			default:
				interaction.reply("Invalid choice?")
		}
		
	},
};
