import Quiz from '../models/quiz';
import Question from '../models/question';
import Answer from '../models/answer';

const validateCreateRequest = body => {
  const error = (field, message) => ({ field, message });
  const errors = [];

  return new Promise((resolve, reject) => {
    if (!body.quizName) {
      errors.push(error('quizName', 'Quiz title not specified'));
    }
    if (!body.questions.length) {
      errors.push(error('questions', 'Quiz questions are empty'));
    }
    if (errors.length > 0) {
      reject({ errors });
    }
    resolve();
  });
};


const quiz = {};

quiz.index = (req, res) => {
  res.json({});
};

quiz.create = (req, res) => {
  validateCreateRequest(req.body)
    .then(() => {
      const questions = req.body.questions.map(question => {
        const answers = question.answers.map(answer => new Answer({ ...answer }));

        return new Question({ ...question, answers });
      });
      const quizName = req.body.quizName;

      const quiz = new Quiz({
        name: quizName,
        questions,
      });

      quiz.save()
        .then(data => {
          res.json({ id: data._id });
        })
        .catch(() => {
          res.send(500).json({ error: 'Could not create quiz.' });
        });
    })
    .catch(error => {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      }

      res.send(500);
    });
};

quiz.show = async (req, res) => {
  const quizId = req.params.id;
  const quiz = await Quiz.findById(quizId)
    .then(quiz => quiz)
    .catch(err => null)
  ;

  if (quiz) {
    res.json({
      id: quiz._id,
      name: quiz.name,
      questions: quiz.questions.map(question => ({
          text: question.text,
          answers: question.answers.map(answer => ({
            text: answer.text,
            isCorrect: answer.isCorrect,
          })),
        })
      ),
    });
  } else {
    res.status(404).send('Not found');
  }
};

export default quiz;
