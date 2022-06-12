const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { insertMany } = require('../Models/Server');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Execute a command [OWNER ONLY]')
                .addStringOption(option =>
                    option.setName('command')
                        .setDescription('Command to execute')
                        .setRequired(true)),

	async execute(interaction) {
        if(interaction.user.id != process.env.OWNER) return interaction.reply("You cannot execute this command.")
        try {
            // Evaluate (execute) our input
            const evaled = eval(interaction.options.getString('command'));
      
            // Put our eval result through the function
            // we defined above
            const cleaned = await interaction.client.Clean(interaction.client, evaled);
      
            // Reply in the channel with our result
            interaction.reply(`\`\`\`js\n${cleaned}\n\`\`\``);
          } catch (err) {
            // Reply in the channel with our error
            interaction.reply(`\`ERROR\` \`\`\`xl\n${err.message}\n\`\`\``);
          }
      
      
    },
};
