import { Schema, model } from "mongoose";

const answerSchema = new Schema({
 
  question_id: { type: Schema.Types.ObjectId, required: true, ref: 'Question' },
  answers: [{
    answer: { type: String },
    vote: { type: Number, default: 0 },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    Date: { type: Date, default: Date.now }
  }],
    

});

model('Answer', answerSchema);
