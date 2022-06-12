const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { format } = require("date-fns")
const { utcToZonedTime } = require("date-fns-tz")
const disabled = false
module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Convert a time to Epoch [EXPERIMENTAL]')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Time to convert')
				.setRequired(true)),

	async execute(interaction) {
    if(disabled == true)
    return interaction.reply("The date convertisor has been temporary disabled do to it being unstable.\nIt is recommended to use <https://www.epochconverter.com> for now.")
        let time = interaction.options.getString('time')
		let er  = undefined
        let err = `Invalid Format\nFormat is MM/DD/YYYY XX:XX\n[DEFAULT TIMEZONE IS EST (America/New_York)]` 
        let can = true

        console.log(time)
        var date = new Date(time)
        const timeZone = 'America/New_York'
        var d = utcToZonedTime(date, timeZone)

       er = await interaction.client.ErrorEmbed(err)
       console.log(date)
        if(date == "Invalid Date" || (!time.includes("/") && !time.includes("-") && !time.includes(":")) ){ can = false; interaction.reply({embeds: [er]}) }

        if(can == true) {
        var Epoch = d.getTime()/1000.0

        const embed = await interaction.client.Embed("Time Convertisor", `Here is your time converted to Epoch (timezone is set to EST)\n<t:${Epoch}>\`\`\`<t:${Epoch}>\`\`\``)
        interaction.reply({embeds: [embed]})
        }
    },
};
