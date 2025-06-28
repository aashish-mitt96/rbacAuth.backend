import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin"
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
})

export const User = mongoose.model<IUser>("User", userSchema)