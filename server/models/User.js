import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    refreshToken: String,
    profilePicture: String
  });

const userModel = mongoose.model('User', userSchema)
export default userModel
