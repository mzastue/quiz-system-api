import quiz from '../../../controllers/quiz';

export default router => {

  router.get('/', quiz.index);

  return router;
};
