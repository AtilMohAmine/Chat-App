import mongoose from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  });

const roomModel = mongoose.model('Room', roomSchema)
export default roomModel
