const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a specified user')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('Specified user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Message to send')),

	async execute(interaction) {
	let candm = true
		if(!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			await interaction.reply("insufficient permission")
			return
		}
       try {
			// console.log(hi)
           const member = interaction.options.getMember('member');
            if(!member.kickable) return interaction.reply("I cannot kick this member!");
                member.kick(interaction.options.getString("reason") || "none");
                let msg = interaction.options.getString("reason")
                if(!msg) {
                    msg = "none"
                } else {
                    msg = msg.replace(`\\n`, "\n");
                }
                const hi = await interaction.client.Embed("<:HCR:968446284686049280> You have been kicked from HCR! <:HCR:968446284686049280>", "Reason: **" + (msg) + "**")
			await interaction.options.getUser('member').send({embeds: [hi] }).catch((error) => {
				interaction.reply("User has been kicked but wasn't DM'ed."); 
				candm = false
				return
			});
			if(candm == true) { 
                interaction.reply("User has been successfully kicked")
            }
		} catch(eror) {
	console.log(eror)
		}
		
	},
};
