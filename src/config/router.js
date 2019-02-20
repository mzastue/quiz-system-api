import { v1 } from './router/routes/api';

export default express => {
  const router = express.Router();

  router.use('/v1', v1(router));

  return router;
};
