import * as express from 'express';

import ResolutionCtrl from '../controllers/resolution';

function ResolutionRoutes(app): void {
  const router = express.Router();
  const resolutionCtrl = new ResolutionCtrl();


  // Users
  router.route('/resolution').get(resolutionCtrl.getAll);
  router.route('/resolutions/count').get(resolutionCtrl.count);
  router.route('/resolution').post(resolutionCtrl.insert);
  router.route('/resolution/:id').get(resolutionCtrl.get);
  router.route('/resolution/:id').put(resolutionCtrl.update);
  router.route('/resolution/:id').delete(resolutionCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default ResolutionRoutes;
