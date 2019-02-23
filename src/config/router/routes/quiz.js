import quiz from '../../../controllers/quiz';

export default router => {

  router.get('/', quiz.index);
  router.get('/:id', quiz.show);
  router.put('/:id', quiz.update);
  router.get('/:id/edit', quiz.edit);
  router.post('/', quiz.create);

  return router;
};
