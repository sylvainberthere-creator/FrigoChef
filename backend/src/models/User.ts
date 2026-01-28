import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  firstName: string;
  email: string;
  password: string; // hashé
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>("User", UserSchema);
