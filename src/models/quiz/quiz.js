import mongoose from '../../config/db';
import Question from '../question';

const quizSchema = mongoose.Schema({
  name: String,
  editLink: { type: [String], index: true },
  timePerQuestion: Number,
  questions: [Question.schema],
  questionTimeLimit: Boolean,
  questionTimeLimitValue: Number,
});

export default mongoose.model('Quiz', quizSchema);
