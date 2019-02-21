import quiz from '../../../controllers/quiz';

export default router => {

  router.get('/', quiz.index);
  router.post('/', quiz.create);

  return router;
};
