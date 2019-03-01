import quiz from '../../../controllers/quiz';

export default router => {

  router.get('/all', quiz.index);
  router.get('/:id', quiz.show);
  router.put('/:edit_link', quiz.update);
  router.get('/:edit_link/edit', quiz.edit);
  router.post('/', quiz.create);

  return router;
};
