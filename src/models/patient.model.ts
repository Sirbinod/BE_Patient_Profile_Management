import { IPatient } from "../interfaces/patient.interface";
import mongoose from "mongoose";

const Patient = new mongoose.Schema(
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

    contact: {
      type: String,
      required: [true, "Please enter a contact"],
    },

    dob: {
      type: String,
      required: [true, "Please enter a dob"],
    },

    address: String,

    file:String,
  },
  { timestamps: true }
);

export default mongoose.model<IPatient & mongoose.Document>("Patient", Patient);
