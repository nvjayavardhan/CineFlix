const express=require('express')
const Router=express.Router()
const User=require('../models/User')
const watchedFilms=require('../models/watchedFilms');
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs');

Router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('username').isLength({min:5}),
    body('location').isLength({min:5})],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) 
        {
            return res.status(400).json({errors:errors.array()})
        }
    try{
        const salt=await bcrypt.genSalt(10);
        let secPass=await bcrypt.hash(req.body.password,salt);
        let username=req.body.username;
        let email=req.body.email;
        let UserData=await User.findOne ({email});
        if(UserData)
        {
            return res.status(400).json({errors:"email is already linked to account"});
        }
        let UserData1=await User.findOne ({username});
        if(UserData1)
        {
            return res.status(400).json({errors:"username is already taken"});
        }
        await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
            location:req.body.location,
            username:req.body.username
        }).then(res.json({success:true}));
        await watchedFilms.create({user:req.body.username,filmswatched:[]});
        
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false});
    }
})
 
module.exports=Router;
