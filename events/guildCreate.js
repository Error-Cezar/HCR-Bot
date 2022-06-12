module.exports = {
	name: 'guildCreate',
	execute(guild) {
        const client = guild.client
		try {
            const New = {
				GuildID: guild.id,
				GuildName: guild.name
			}
			client.createGuild(New)
			client.createPhone(New)

		} catch(error) {
			console.error(error)
		}

	},
};