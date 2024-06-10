import {Schema, model} from 'mongoose'
import type {UserI} from '../types/User'

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<UserI>('User',UserSchema)

export default UserModel