import quiz from '../../../controllers/quiz';

export default router => {

  router.get('/', quiz.index);
  router.get('/:id', quiz.show);
  router.post('/', quiz.create);

  return router;
};
