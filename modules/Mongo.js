const mongoose = require('mongoose');
const { Guild, Phone } = require(`${process.cwd()}/Models/index.js`);

module.exports = client => {

    client.getGuild = async (guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return "NoGuild";
    };

    client.getPhone = async (guild) => {
        let data = await Phone.findOne({ guildID: guild.id });
        if (data) return data;
        else return "NoGuild";
    };

    client.updateGuild = async (guild, s1, s2) => {
        let data = await client.getGuild(guild);
        const settings = JSON.parse(`{"${s1}": "${s2}"}`)

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }
        console.log(`Guild "${data.GuildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    client.updatePhone = async (guild, s1, s2) => {
        console.log("Updating")
        let data = await client.getPhone(guild);
        console.log("Got")
        const settings = JSON.parse(`{"${s1}": "${s2}"}`)

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }
        console.log(`Guild "${data.GuildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };


    client.deleteGuild = async (guild) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') { console.warn("No data found for the current guild."); return "error" }
        data.deleteOne({GuildID: guild.id}).then(function(){
            console.log(`Removed ${guild.Name} from the DataBase`);
            return "success"
        }).catch(function(error){
            console.error(error); // Failure
            return "error"
        });
    };

    client.createGuild = async (settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.defaultSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.GuildName}" (${merged.GuildID})`));
    };

    client.createPhone = async (settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, {Emergency: "none", Dispatch: "none"});
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Phone(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.GuildName}" (${merged.GuildID})`));
    };
};