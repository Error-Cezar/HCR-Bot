const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    GuildID: String,
    GuildName: String,
    WelcomeMessage: {
        type: String,
        default: "Welcome to **{{server}}** {{user}} !"
    },
    WelcomeChannel: {
        type: String,
        default: "none"
    },
    ConfessChannel: {
        type: String,
        default: "none"
    }

});

module.exports = mongoose.model("Guild", SettingSchema)