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

  countWith = async (req, res) => {
    try {
        const count = await this.model.count();
        res.status(200).json(count);
     
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  getAllData = async (req, res) => {
    try {
        const count = await this.model.find();
        res.status(200).json(count);
     
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export class LawsuitTableCtrl extends BaseCtrl {
  model: Model<Document> = LawsuitTable;
  countLawsuit = (req:Request, res: Response)=>{
   try {
    this.model.aggregate([
      {$lookup: {
           from: 'lawsuitinfos',
           localField: 'lawsuitFile',
           foreignField: "_id",
           as: "lawsuitFile"  
      }},
      {
      $unwind: "$lawsuitFile"
      },
      {$match: {"lawsuitFile.court_name" : RegExp(req.body.value,'i')} }
      ]).count('countNumber').exec((err,doc)=>{
        if(err) res.status(400).json({ error: err.message });
        res.status(200).json(doc);
      })
   } catch (error) {
    return res.status(400).json({ error: error.message });
   }
  }

  getLawsuitList = (req:Request, res: Response)=>{
    try {
     this.model.aggregate([
      {$lookup: {
           from: 'lawsuitinfos',
           localField: 'lawsuitFile',
           foreignField: "_id",
           as: "lawsuitFile"  
      }},
      {
      $unwind: "$lawsuitFile"
      },
      {
      $facet :{
          allData : [
           {$group: 
               {
                   _id: 'all',
                   feild: {$push: {
                            "lawsuit_no" : "$lawsuitFile.l_no",
                            "lawsuit_year" : "$lawsuitFile.l_year",
                            "lawsuit_date" : "$lawsuitFile.l_date",
                            "lawsuit_court" : "$lawsuitFile.court_name",
                            "l_type" : "$lawsuitFile.l_type",
                            "l_type_no" : "$lawsuitFile.l_type_no",
                            "l_type_s" : "$lawsuitFile.l_type_s",
                            "l_cost" : "$lawsuitFile.l_cost",
                            "l_cost_type" : "$lawsuitFile.l_cost_type",
                            "claimant_no" : "$lawsuitFile.claimant_no",
                            "defendant_no" : "$lawsuitFile.defendant_no",
                            "witness_no" : "$lawsuitFile.witness_no",
                            "has_no_coast" : "$lawsuitFile.has_no_coast",
                            "session_no" : "$session_no",
                            "session_court" : "$court_name",
                            "judge_name" : "$judge_name",
                            "from_date" : "$from_date",
                            "to_date" : "$to_date",
                            "postponement_period" : "$postponement_period",
                            "postponement_period_couse" : "$postponement_period_couse",
                            "reason_details" : "$reason_details",
                            "stage" : "$stage",
                            "session_active" : "$session_active",
                            "has_lawyer" : "$session_active",
                     }}
                       } 
                   },
              ],
          solehData : [
          {$match : {"lawsuitFile.court_name" : /صلح/}},
           {$group: 
               {
                   _id: 'all',
                   sum: {$sum: 1}
                       }  
                   },
              ],
         bedaiaData : [
          {$match : {"lawsuitFile.court_name" : /بداية/}},
           {$group: 
               {
                   _id: 'all',
                   sum: {$sum: 1}
                       } 
                   },
              ],
        subdata: [
            {$group: {_id:'$lawsuitFile.court_name' , sum : {$sum: 1} }}
        ]
      }
      },
      
      ]).exec((err,doc)=>{

         if(err) res.status(400).json({ error: err.message });
         res.status(200).json(doc);
       })
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
   }
}

export class RequestTableCtrl extends BaseCtrl {
  model: Model<Document> = RequestTable;
  countRequest = (req:Request, res: Response)=>{
    try {
     this.model.aggregate([
       {$lookup: {
            from: 'lawsuitinfos',
            localField: 'lawsuitFile',
            foreignField: "_id",
            as: "lawsuitFile"  
       }},
       {
       $unwind: "$lawsuitFile"
       },
       {$match: {"lawsuitFile.court_name" : RegExp(req.body.value,'i')} }
       ]).count('countNumber').exec((err,doc)=>{
         if(err) res.status(400).json({ error: err.message });
         res.status(200).json(doc);
       })
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
   }

   getRequestList = (req:Request, res: Response)=>{
    try {
     this.model.aggregate([
      {$lookup: {
           from: 'lawsuitinfos',
           localField: 'lawsuitFile',
           foreignField: "_id",
           as: "lawsuitFile"  
      }},
      {
      $unwind: "$lawsuitFile"
      },
      {
      $facet :{
          allData : [
           {$group: 
               {
                   _id: 'all',
                   feild: {$push: {
                            "lawsuit_no" : "$lawsuitFile.l_no",
                            "lawsuit_year" : "$lawsuitFile.l_year",
                            "lawsuit_date" : "$lawsuitFile.l_date",
                            "lawsuit_court" : "$lawsuitFile.court_name",
                            "l_type" : "$lawsuitFile.l_type",
                            "l_type_no" : "$lawsuitFile.l_type_no",
                            "l_type_s" : "$lawsuitFile.l_type_s",
                            "l_cost" : "$lawsuitFile.l_cost",
                            "l_cost_type" : "$lawsuitFile.l_cost_type",
                            "claimant_no" : "$lawsuitFile.claimant_no",
                            "defendant_no" : "$lawsuitFile.defendant_no",
                            "witness_no" : "$lawsuitFile.witness_no",
                            "has_no_coast" : "$lawsuitFile.has_no_coast",
                            "request_no" : "$request_no",
                            "request_year" :"$request_year",
                            "request_type" : "$request_type",
                            "judge_name" : "$judge_name",
                            "applicant_name" : "$applicant_name",
                            "applicant_date" : "$applicant_date",
                            "applicant_do_date" :"$applicant_do_date",
                            "applicant_do_period" : "$applicant_do_period",
                            "is_applicant" : "$is_applicant",
                            "applicant_count" :"$applicant_count",
                           }}
                       } 
                   },
              ],
          solehData : [
          {$match : {"lawsuitFile.court_name" : /صلح/}},
           {$group: 
               {
                   _id: 'all',
                   sum: {$sum: 1}
                       } 
                   },
              ],
         bedaiaData : [
          {$match : {"lawsuitFile.court_name" : /بداية/}},
           {$group: 
               {
                   _id: 'all',
                   sum: {$sum: 1}
                       } 
                   },
              ],
        subdata: [
            {$group: {_id:'$lawsuitFile.court_name' , sum : {$sum: 1} }}
        ]
      }
      },
      
      ]).exec((err,doc)=>{
         if(err) res.status(400).json({ error: err.message });
         res.status(200).json(doc);
       })
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
   }
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
