import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  image: { type: String },
});

export const User = models.User || model("User", UserSchema);