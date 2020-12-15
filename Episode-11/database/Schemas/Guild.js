const { Schema, model } = require("mongoose");

const Guild = new Schema({

    guildId: { type: String, required: true },

    mutedUsers: { type: Array, required: false, default: [] },
    muteRole: { type: String, required: false, default: "" },

});

module.exports = model("guilds", Guild);