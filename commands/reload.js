const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload a command (OWNER ONLY)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('command')
                .setDescription('Reload a command.')
                .addStringOption(option =>
                    option.setName('command')
                        .setDescription('Command to reload')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('slash')
                .setDescription('Reload all slash cmd for a guild.')
                .addStringOption(option =>
                    option.setName('guild')
                        .setDescription('Guild to reload')
                        .setRequired(true))),

	async execute(interaction) {
    switch(interaction.options.getSubcommand()) {
        case "command":
      if(interaction.user.id != process.env.OWNER) return interaction.reply("You cannot execute this command.")
      const client = interaction.client
      const CmdName = interaction.options.getString("command")
      const command = interaction.client.commands.get(CmdName);
    
      if (!command) return interaction.reply("Invalid command")
		
      // We remove the specified command by finding the command name
      delete require.cache[require.resolve(`${process.cwd()}/commands/${command.data.name}`)];

      // We readd the command by using the same method as in index.js
      const cmd = require(`${process.cwd()}/commands/${CmdName}`);
      client.commands.set(cmd.data.name, cmd);
      // We log the reload and send a success message.
      console.log(`[HCR BOT] => ${cmd.data.name}.js reloaded.`)
      interaction.reply(`\`\`${cmd.data.name}.js\`\` reloaded.`)
      break;
      case "slash":
        const { Deploy } = require(`${process.cwd()}/deploy`);
       const Guild = interaction.options.getString("guild")
       await interaction.deferReply();
       let answer = await Deploy(interaction.client.user.id, Guild)
       if(answer == "success") {
      await interaction.editReply("successfully updated application commands.")
       } else {
          interaction.editReply("An error occured please check console.")
       }
      break;
      default:
          interaction.reply("How did you end up here?")
    }
    },
};
