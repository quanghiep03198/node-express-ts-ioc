import mongoose from "mongoose";
import { IUser, UserRole } from "./user.interface";

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    address: {
      type: String,
      minLength: 10,
      maxLength: 100,
    },
    phone_number: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    dob: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const UserModel = mongoose.model("User", UserSchema);
