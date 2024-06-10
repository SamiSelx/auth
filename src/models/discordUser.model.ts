import {Schema, model} from 'mongoose'
import type { DiscordUserI } from '../types/User';

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
    isRegistred: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  }
);


const DiscordUserModel = model<DiscordUserI>('DiscordUser',DiscordUserSchema)

export default DiscordUserModel