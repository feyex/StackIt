import { Schema, model } from "mongoose";

const userSchema = new Schema({
  
  displayname: { type: String, required: true },
  fullname: { type: String },
  profilePic: { type: String},
  verified: { type: Boolean, default: true },
  email: { type: String, required: true, unique: true },
  location: { type: String},
  password: { type: String, required: true },
  title: { type: String},
  
});

model('User', userSchema);
