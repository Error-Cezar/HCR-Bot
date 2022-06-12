const discord = require('discord.js');

module.exports = (client, guildConf, message) => {

	client.Embed = (title, description, fields, footer, color, thumbnail, image) => {
        return new Promise((resolve, reject) => {
               const embed = {
                    title: title,
                    description: description,
                    fields: fields || "",
                    thumbnail: { url: thumbnail || "" },
                    image: { url: image || "" },
                    color: color || "BLUE",
                    footer: { text: footer || "Hillview County"}
                }
                resolve(embed);
                return embed;
        });
    }
	
	client.ErrorEmbed = (error) => {
		return new Promise((resolve, reject) => {
                const embed = {
                    title: ":x: ERROR :x:",
                    description: `\`\`\`${error}\`\`\``,
                    color: "RED",
                }
                resolve(embed);
                return embed;
        });
    }
		
}