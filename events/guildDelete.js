module.exports = {
	name: 'guildDelete',
	execute(guild) {
        const client = guild.client
		try {
			client.deleteGuild(guild)

		} catch(error) {
			console.error(error)
		}

	},
};