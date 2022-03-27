import { LawsuitInfo , LawsuitTable , RequestTable } from "../models/lawsuit";
import { Model } from 'mongoose';

import BaseCtrl from "./base";

export class LawsuitInfoCtrl extends BaseCtrl{
   model: Model<Document> = LawsuitInfo;

}

export class LawsuitTableCtrl extends BaseCtrl{
  model: Model<Document> = LawsuitTable;

}

export class RequestTableCtrl extends BaseCtrl{
  model: Model<Document> = RequestTable;

}
