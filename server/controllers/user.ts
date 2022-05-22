import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';

class UserCtrl extends BaseCtrl {
  model = User;

  login = (req: Request, res: Response) => {
    this.model.findOne({ username: req.body.username }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
            req.session['user'] = user;
            res.status(200).json({ token });
      });
    });
  }

  restPassword = (req: Request , res: Response) =>{
    let body = req.body
    genSalt(10, (err, salt) => {
      if (err) { return res.send({success: false, message: err}); }
      hash(body.password, salt, (error, hashedPassword) => {
        if (error) { res.send({success: false, message: error}); }
        body.password = hashedPassword;
        this.model.findOneAndUpdate({_id: body._id},{$set: {password: body.password}},{new: true},(err,doc)=>{
          if(err) { res.send({success: false, message: err}); }
          res.send({success: true, doc: doc})
        })
      });
    });
  }

}

export default UserCtrl;
