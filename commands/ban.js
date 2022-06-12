const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a specified user')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('Specified user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Message to send')),

	async execute(interaction) {
	let candm = true
		if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			await interaction.reply("insufficient permission")
			return
		}
       try {
			// console.log(hi)
            const member = interaction.options.getMember('member');
            const user = interaction.options.getUser('member');
            if(!member.bannable) return interaction.reply("I cannot ban this member!");
                member.ban(interaction.options.getString("reason") || "none");
                let msg = interaction.options.getString("reason")
                if(!msg) {
                    msg = "none"
                } else {
                    msg = msg.replace(`\\n`, "\n");
                }
                const hi = await interaction.client.Embed("<:HCR:968446284686049280> You have been banned from HCR! <:HCR:968446284686049280>", "Reason: **" + (msg) + "**")
			await interaction.options.getUser('member').send({embeds: [hi] }).catch((error) => {
				interaction.reply(`${user.username}(${user.id}) has been banned but wasn't DM'ed.`); 
				candm = false
				return
			});
			if(candm == true) { 
                interaction.reply(`${user.username}(${user.id}) has been successfully banned`)
            }
		} catch(eror) {
	console.log(eror)
		}
		
	},
};
