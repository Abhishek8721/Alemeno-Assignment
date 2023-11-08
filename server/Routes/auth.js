const express = require('express')
const mongoose = require("mongoose")
const User = require('../Models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const app = express()
app.post("/signup",async(req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user){
          return res.json({result:false,msg:"User already exist please login"})
      }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
    
        await newUser.save();
     res.json({result:true,msg:"User has been created!"})
    
      } catch (error) {
        res.send(error)
      }
})
app.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user){
          return res.json({result:false,msg:"User not found"})
          
        }
    
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
    
        if (!isCorrect) {
          return res.json({result:false,msg:"Wrong Credentials!"})
            
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
          }).json({result:true,data:others});
      } catch (error) {
        res.send(error)
      }
})
module.exports = app