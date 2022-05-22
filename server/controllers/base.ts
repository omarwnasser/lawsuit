import { Request, Response } from "express";

abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = async (_req: any, res: Response) => {
    try {
      const docs = await this.model.find({});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get limit  {limit , page }
  getLimit = async (req: Request, res: Response) => {
    try {
      const docs = await this.model.find({}).skip((Number(req.params.page) - 1) * Number(req.params.limit)).limit(Number(req.params.limit));
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

   // Get limit and sort  {limit: number , page: number , sort: String }
   getLimitSort = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      let sort = {}
      sort[body.sort] = -1
      const docs = await this.model.find({}).sort(sort).skip((body.page - 1) * body.limit).limit(body.limit);
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get limit and sort  { where : [object]} // {name : value}
  getFindWith = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const docs = await this.model.find(body);
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Count all
  count = async (req, res) => {
    try {
      const count = await this.model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Insert
  insert = async (req, res) => {
    try {
      const obj = await new this.model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  get = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update by id
  update = async (req, res) => {
    try {
      let doc = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body,{new: true});
        res.send(doc);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete by id
  delete = async (req, res) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
        res.send({message: 'this file is was delete' , success: true});
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BaseCtrl;
