const { Schema, model } = require("mongoose")

const twitch = new Schema({
    user: {
        type: String,
        require: true
    },
    titulo: {
        type: String,
        require: true
    }
})

module.exports = model("twitchSchema", twitch)