const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, GuildAuditLogs } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setsetting')
		.setDescription('Send a message to a specified user')
		.addStringOption(option =>
			option.setName('setting')
				.setDescription('Setting to change')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('parameter')
				.setDescription('Parameter to set')
				.setRequired(true)),

	async execute(interaction) {
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
			await interaction.reply("insufficient permission")
			return
		}
		const client = interaction.client
		const guildConf = await client.getGuild(interaction.guild);
		//console.log(typeof guildConf)
        if(guildConf == "NoGuild") {
			let embed = await client.ErrorEmbed(`No guild configuration found.. Please wait a few seconds and run the command again.`);
			interaction.reply({ embeds: [embed] });
			interaction.client.emit('guildCreate', interaction.guild);
			return;
		}

		function Writable(prop) { if(prop == "GuildName" || prop == "GuildID" || prop == "_v" || prop == "_id") return false; else return true; }

		const { Guild } = require(`${process.cwd()}/Models/index.js`);
		const prop  = interaction.options.getString('setting');
		const value = interaction.options.getString('parameter');
		let paths = [];
		Guild.schema.eachPath(function(path) {
			paths.push(path)
		})
		console.log("[PROP] =>", prop)
		console.log("[INCLUDES] =>", paths.includes(prop))
		console.log("[GUILD CONFIG] =>", paths)
        if(!paths.includes(prop) || Writable(prop) == false) {
		let configProps = Object.keys(guildConf).map(prop => {
			for (var key in guildConf) {
				if (guildConf.hasOwnProperty(key)) {
				   
				}
			  }
			});
            return interaction.reply(`Invalid setting.`);
          }
      
        await client.updateGuild(interaction.guild, prop, value)
      
          // We can confirm everything's done to the client.
          interaction.reply(`Server setting ${prop} has been changed to:\n\`${value}\``);
      
		
	},
};
