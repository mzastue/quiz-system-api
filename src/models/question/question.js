import mongoose from '../../config/db';
import Answer from '../answer';

const questionSchema = mongoose.Schema({
  text: String,
  answers: [Answer.schema],
});

export default mongoose.model('Question', questionSchema);
