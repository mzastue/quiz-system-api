import Quiz from '../models/quiz';
import Question from '../models/question';
import Answer from '../models/answer';

const validateCreateRequest = (body, toValidate = []) => {
  const error = (field, message) => ({ field, message });
  const errors = [];

  return new Promise((resolve, reject) => {
    toValidate.forEach(paramToValidate => {

      if (!body[paramToValidate].length) {
        errors.push(error(paramToValidate, `${paramToValidate} not specified`))
      }
    });

    if (errors.length > 0) {
      reject({ errors });
    }
    resolve();
  });
};

const createQuestions = questions => {
  return questions.map(question => ({
    text: question.text,
    answers: question.answers.map(answer => ({
      text: answer.text,
      isCorrect: answer.isCorrect,
    })),
  }));
};

const base64 = val => Buffer.from(val).toString('base64');

const quiz = {};

quiz.index = (req, res) => {
  res.json({});
};

quiz.create = (req, res) => {
  validateCreateRequest(req.body, ['quizName', 'questions'])
    .then(() => {
      const questions = req.body.questions.map(question => {
        const answers = question.answers.map(answer => new Answer({ ...answer }));

        return new Question({ ...question, answers });
      });
      const quizName = req.body.quizName;
      const createEditLink = name => `${base64(base64((+new Date).toString())+name)}`;

      const quiz = new Quiz({
        name: quizName,
        editLink: createEditLink(quizName),
        questions,
      });

      quiz.save()
        .then(data => {
          res.json({
            editLink: data.editLink,
            id: data._id,
          });
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
      questions: createQuestions(quiz.questions),
    });
  } else {
    res.status(404).send('Not found');
  }
};

quiz.edit = async (req, res) => {
  const quiz = await Quiz.findOne({ editLink: req.params.id })
    .then(quiz => quiz)
    .catch(err => null)
  ;

  if (quiz) {
    res.json({
      id: quiz._id,
      name: quiz.name,
      createdQuestions: quiz.questions.map(question => ({
        // answers are not accessible during edit
        // because we dont want to know any other people question answers
        // just the question text to see whats already created
        text: question.text,
        answersCount: question.answers.length,
      })),
    })
  } else {
    res.status(404).send('Not found');
  }
};

quiz.update = (req, res) => {
  validateCreateRequest(req.body, ['newQuestions'])
    .then(async () => {
      const quiz = await Quiz.findById(req.params.id);
      createQuestions(req.body.newQuestions).forEach(createdQuestion => {
        quiz.questions.push(createdQuestion);
      });
      quiz.save();
    })
    .catch(error => {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      }

      res.send(500);
    });
};

export default quiz;
