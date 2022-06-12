const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help!')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('Specific command')),

	async execute(interaction) {
      let CmdName = interaction.options.getString('command')
      let Commands = [];
      if(CmdName) {
        const command = interaction.client.commands.get(CmdName);
        if(!command) return interaction.reply("Invalid command.")
        let option = []
        if(command.data.options.length != 0) {
          command.data.options.forEach(function(item, _, array) {
          option.push(`\n**Name:** ${item.name}\n**Description:** ${item.description}\n**Required:** ${item.required}\n`)
        });
      }

        const the = {
            name: command.data.name,
            value: `description: ${command.data.description}\noptions: ${option}`
        }
      Commands.push(the)
      const hi = await interaction.client.Embed("Help Commands", "Here is your thing", Commands)
      interaction.reply({embeds: [hi]})
      } else {
      const commandFiles = require("fs").readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`${process.cwd()}/commands/${file}`);
        let option = command.data.options.length
        if(command.data.options.length == 0) { option = "none" }
        const the = {
            name: command.data.name,
            value: `**description:** ${command.data.description}\n**options:** ${option}`
        }
      Commands.push(the)
      }
      const hi = await interaction.client.Embed("Help Commands", "Here are the list of commands", Commands)
      interaction.reply({embeds: [hi]})
    }
  },
};
