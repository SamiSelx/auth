const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const DiscordUserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);


const DiscordUserModel = mongoose.model('DiscordUser',DiscordUserSchema)

module.exports = DiscordUserModel