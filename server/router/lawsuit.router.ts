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
  router.route('/lawsuitinfoList/count/all').get(lawsuitInfoCtrl.count)
  router.route('/lawsuitinfoList/get/all').get(lawsuitInfoCtrl.getAllData)


  // lawsuitTable
  router.route('/lawsuittable').post(lawsuitTableCtrl.insert);
  router.route('/lawsuittable/where').post(lawsuitTableCtrl.getFindWith);
  router.route('/lawsuittable/:id').get(lawsuitTableCtrl.get);
  router.route('/lawsuittable/:id').put(lawsuitTableCtrl.update);
  router.route('/lawsuittable/:id').delete(lawsuitTableCtrl.delete);
  router.route('/lawsuittableList/count').post(lawsuitTableCtrl.countLawsuit)
  router.route('/lawsuittableList/count/all').get(lawsuitTableCtrl.count)
  router.route('/lawsuittableList/report').get(lawsuitTableCtrl.getLawsuitList)

  // RequestTable
  router.route('/requesttable').post(requestTableCtrl.insert);
  router.route('/requesttable/where').post(requestTableCtrl.getFindWith);
  router.route('/requesttable/:id').get(requestTableCtrl.get);
  router.route('/requesttable/:id').put(requestTableCtrl.update);
  router.route('/requesttable/:id').delete(requestTableCtrl.delete);
  router.route('/requesttableList/count').post(requestTableCtrl.countRequest)
  router.route('/requesttableList/count/all').get(requestTableCtrl.count)
  router.route('/requesttableList/report').get(requestTableCtrl.getRequestList)

  // dataList

  router.route('/datalist').post(dataListCtrl.insert);
  router.route('/datalist/push').post(dataListCtrl.pushToArray);
  router.route('/datalist').get(dataListCtrl.getAll);
  router.route('/datalist/pull').post(dataListCtrl.pullFromArray);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default LawsuitRoutes;
