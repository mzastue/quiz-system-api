import quiz from '../quiz';

export default router => {

  router.use('/quiz', quiz(router));

  return router;
};
