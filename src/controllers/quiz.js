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

export default quiz;
