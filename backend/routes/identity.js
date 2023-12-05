require('dotenv').config();
const { Router } = require('express');

const jwt = require('jsonwebtoken');
const User = require('../models/user')
const router = Router();
router.post("/api/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.exists({username:username,password:password}).then((data)=>{
        if(data){
            const accessToken = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
            res.json({username:username,accessToken:accessToken});

        }else{
            res.sendStatus(401);
        }
    });

});
  
module.exports=router;