const discord = require('discord.js');

module.exports = (client, guildConf, message) => {

    client.Clean = async (client, text) => {
            // If our input is a promise, await it before continuing
            if (text && text.constructor.name == "Promise")
              text = await text;
            
            // If the response isn't a string, `util.inspect()`
            // is used to 'stringify' the code in a safe way that
            // won't error out on objects with circular references
            // (like Collections, for example)
            if (typeof text !== "string")
              text = require("util").inspect(text, { depth: 1 });
            
            // Replace symbols with character code alternatives
            text = text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));

              text = text.replaceAll(client.token, "[REDACTED]");

              text = text.replaceAll(process.env.TOKEN, "[REDACTED]");
            
            // Send off the cleaned up result
            return text;
            }
    

}