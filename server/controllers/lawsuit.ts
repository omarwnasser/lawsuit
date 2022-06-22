import { DataList, LawsuitInfo, LawsuitTable, RequestTable } from "../models/lawsuit";
import { Model } from 'mongoose';

import BaseCtrl from "./base";
import { Request, Response } from "express";

export class LawsuitInfoCtrl extends BaseCtrl {
  model: Model<Document> = LawsuitInfo;

  // Insert
  insertInfo = async (req, res: Response) => {
    let body = req.body;
    let user = req.session.user;
    if(user._id)
    try {
      const isexist = await this.model.findOne({ l_no: body.l_no, l_year: body.l_year, court_name: body.court_name })
      console.log(isexist)
      if (!isexist) {
        try {
          const obj = await new this.model({...req.body,user: user._id}).save();
          res.status(201).json(obj);
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      } else {
        return res.send({ message: 'هناك قضية سابقة بنفس التفاصيل', success: false });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    else
     res.send({ message: 'يجب إعادة تسجيل الدخول', success: false , logout: true })

  }

  getLimitByUser = async (req, res: Response) => {
    try {
      if(req.session.user.role == 'admin'){
        const docs = await this.model.find({}).populate("user",'username').skip((Number(req.params.page) - 1) * Number(req.params.limit)).limit(Number(req.params.limit));
        res.status(200).json(docs);

      }else if(req.session.user.permissions.length &&( req.session.user.permissions.includes('la')|| req.session.user.permissions.includes('lb'))){
        const docs = await this.model.find({court_name: req.session.user.permissions.includes('la')? /بداية/ : /صلح/}).populate("user",'username').skip((Number(req.params.page) - 1) * Number(req.params.limit)).limit(Number(req.params.limit));
        res.status(200).json(docs);
      }else{
        const docs = await this.model.find({user: req.session.user._id}).populate("user",'username').skip((Number(req.params.page) - 1) * Number(req.params.limit)).limit(Number(req.params.limit));
        res.status(200).json(docs);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  count = async (req, res) => {
    try {
      if(req.session.user.role == 'admin'){
        const count = await this.model.count();
        res.status(200).json(count);
      }else{
        const count = await this.model.count({user:req.session.user._id });
        res.status(200).json(count);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export class LawsuitTableCtrl extends BaseCtrl {
  model: Model<Document> = LawsuitTable;

}

export class RequestTableCtrl extends BaseCtrl {
  model: Model<Document> = RequestTable;

}

export class DataListCtrl extends BaseCtrl {
  model: Model<Document> = DataList;

  // update by id and insert in array of Object

  updateArray = async (req: Request, res: Response) => {
    try {
      const body: any = req.body;
      this.model.updateOne({ _id: body._id, "dataValues._id": body.dataId }, { $set: { "dataValues.$": body.data } }, { new: true }, (err: Error, result: any) => {
        if (err) res.send({ state: false, error: err.message });
        res.send({ state: true, data: result })
      })
    } catch (error: any) {
      res.send({ state: false, error: error })
    }
  }

  pushToArray = async (req: Request, res: Response) => {
    try {
      const body: any = req.body;
      this.model.updateOne({ _id: body._id }, { $push: { "dataValues": body.data } }, { new: true }, (err: Error, result: any) => {
        if (err) res.send({ state: false, error: err.message });
        res.send({ state: true, data: result })
      })
    } catch (error) {
        res.send({ state: false, error: error })
    }
  }

  pullFromArray =async (req:Request, res: Response) => {
    try {
      const body: any = req.body;
      this.model.updateOne({ _id: body._id }, { $pull: { "dataValues": {_id: body.dataId} } }, { new: true,multi: false }, (err: Error, result: any) => {
        if (err) res.send({ state: false, error: err.message });
        res.send({ state: true, data: result })
      })
    } catch (error) {
      res.send({ state: false, error: error })
    }
  }
}
