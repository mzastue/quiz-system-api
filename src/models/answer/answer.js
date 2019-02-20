import mongoose from '../../config/db';

const answerSchema = mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

export default mongoose.model('Answer', answerSchema);
