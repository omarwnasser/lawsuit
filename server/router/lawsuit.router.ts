import * as express from 'express';

import {LawsuitInfoCtrl , LawsuitTableCtrl , RequestTableCtrl, DataListCtrl} from '../controllers/lawsuit';

function LawsuitRoutes(app): void {
  const router = express.Router();
  const lawsuitInfoCtrl = new LawsuitInfoCtrl();
  const lawsuitTableCtrl = new LawsuitTableCtrl();
  const requestTableCtrl = new RequestTableCtrl();
  const dataListCtrl = new DataListCtrl();


  // lawsuitInfo
  router.route('/lawsuitinfo').post(lawsuitInfoCtrl.insert);
  router.route('/lawsuitinfo2').post(lawsuitInfoCtrl.insertInfo);
  router.route('/lawsuitinfo/count').get(lawsuitInfoCtrl.count);
  router.route('/lawsuitinfo/:id').get(lawsuitInfoCtrl.get);
  router.route('/lawsuitinfo/:id').put(lawsuitInfoCtrl.update);
  router.route('/lawsuitinfo/:id').delete(lawsuitInfoCtrl.delete);
  // router.route('/lawsuitinfo/:limit/:page').get(lawsuitInfoCtrl.getLimit);
  router.route('/lawsuitinfo/:limit/:page').get(lawsuitInfoCtrl.getLimitByUser);

  // lawsuitTable
  router.route('/lawsuittable').post(lawsuitTableCtrl.insert);
  router.route('/lawsuittable/where').post(lawsuitTableCtrl.getFindWith);
  router.route('/lawsuittable/:id').get(lawsuitTableCtrl.get);
  router.route('/lawsuittable/:id').put(lawsuitTableCtrl.update);
  router.route('/lawsuittable/:id').delete(lawsuitTableCtrl.delete);

  // RequestTable
  router.route('/requesttable').post(requestTableCtrl.insert);
  router.route('/requesttable/where').post(requestTableCtrl.getFindWith);
  router.route('/requesttable/:id').get(requestTableCtrl.get);
  router.route('/requesttable/:id').put(requestTableCtrl.update);
  router.route('/requesttable/:id').delete(requestTableCtrl.delete);

  // dataList

  router.route('/datalist').post(dataListCtrl.insert);
  router.route('/datalist/push').post(dataListCtrl.pushToArray);
  router.route('/datalist').get(dataListCtrl.getAll);
  router.route('/datalist/pull').post(dataListCtrl.pullFromArray);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default LawsuitRoutes;
