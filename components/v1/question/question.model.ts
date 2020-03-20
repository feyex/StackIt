import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  question: { type: String },
  vote: { type: Number, default: 0 },
});

model('Question', questionSchema);