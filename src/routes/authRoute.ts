require('dotenv').config();
const {Express} = require("express");
const express: typeof Express = require('express');
const authRouter = express.Router();
const { Request, Response } = require("express");
const { signUp, fetchUsers } = require('../controllers/auth')

authRouter.post('/signup', async(req: typeof Request,res: typeof Response) =>{
  signUp(res, req)
})

authRouter.get('/', async(req: typeof Request,res: typeof Response) =>{
  fetchUsers(res, req)
})

export {}
module.exports = authRouter
//(res: typeof Response, req: typeof Request)