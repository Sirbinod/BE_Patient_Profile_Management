import { IUser } from "../interfaces/users.interface";
import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      require: [true, "Please enter a email"],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser & mongoose.Document>("User", User);
