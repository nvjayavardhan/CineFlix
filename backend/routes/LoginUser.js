const express=require('express')
const Router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {body,validationResult}=require('express-validator')
const jwtSecret="MyNameIschikki";

Router.post('/loginuser',[
    body('username').isLength({min:5}),
    body('password').isLength({min:5})],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})
        }
    try{
        let username=req.body.username;
        let UserData=await User.findOne({username});
        if(!UserData)
        {
            return res.status(400).json({errors:"Enter correct username"})
        }
        pwdCompare=await bcrypt.compare(req.body.password,UserData.password)
        if(!pwdCompare)
        {
            return res.status(400).json({errors:"Enter correct password"})
        }
        const data={
            user:{
                id:UserData.id
            }
        }
        const AuthToken=jwt.sign(data,jwtSecret);
        console.log(AuthToken);
        return res.json({success:true,AuthToken:AuthToken});
    }
    catch(error)
    {
        console.log(error)
        return res.json({success:false});
    }
})
 
module.exports=Router;
