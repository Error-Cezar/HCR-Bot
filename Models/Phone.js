const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    GuildID: String,
   GuildName: String,
    Emergency: {
        type: String,
        default: "none"
    },
    Dispatch: {
        type: String,
        default: "none"
    }

});

module.exports = mongoose.model("Phone", SettingSchema)