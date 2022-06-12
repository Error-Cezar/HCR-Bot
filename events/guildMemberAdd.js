module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        const client = member.client
		const guildConf = await client.getGuild(member.guild);
		if(guildConf.WelcomeChannel === "none") return
		const xd = member.guild.channels.cache.find(channel => channel.name === guildConf.WelcomeChannel)
		if(xd == undefined) return
		let welcomeMessage = guildConf.WelcomeMessage

		// Our welcome message has a bit of a placeholder, let's fix that:
		welcomeMessage = welcomeMessage.replaceAll("{{user}}", `<@${member.user.id}>`)
		welcomeMessage = welcomeMessage.replaceAll("{{server}}", member.guild.name)
		xd.send(welcomeMessage)
	},
};