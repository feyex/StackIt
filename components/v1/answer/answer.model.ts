import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  question_id: { type: Schema.Types.ObjectId, required: true, ref: 'Question' },
  answer: { type: String },
  vote: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now }
});

model('Answer', answerSchema);
