const User = require('../models/ModelUser');
const jwt = require('jsonwebtoken');
// const bodyParser = require("body-parser");
require('dotenv').config();
const expressJwt = require('express-jwt');



// =============================================================================
// sinUp
// =============================================================================

exports.sinUp = async(req,res)=>{
    const userExists = await User.findOne({email:req.body.email}) ;
    if(userExists) return res.status(403).json({
        error : "Email is taken"
    })
   let  user = await new User(req.body)
    await user.save()
    res.status(200).json({message : "signup success with module"})
}



// =============================================================================
// signin
// =============================================================================
exports.singIn = (req,res) =>{
    //find user in db
const {email,password} =req.body;
User.findOne({email},(err,user)=>{
    //if error or no user
    if(err || !user){
        return res.status(401).json({error:"user or email does not exist , please singin"})
    }
    //if user found make sur the email and password match
    //create authenticate methode in model and use here
    if(!user.auhtenticate(password)){
        return res.status(401).json({error:"email and password do not match"})
    }


    //generate user id and secret
    const token =jwt.sign({_id : user._id},process.env.JWT_SECRET);

    //persits token as 't' in cookie with expire date
    res.cookie("t",token,{expire:new Date() +9999})


    //return response with user and token to front-end client 
    const {_id,name,email} = user
    return res.json({token, user:{_id,name,email}})
})
}



// =============================================================================
// singOut
// =============================================================================

exports.singOut =(req,res)=>{
    res.clearCookie("t");
    return res.json({ messsage :"signout success!"})
}


exports.requireSingin = expressJwt({
    //if is token is valid,express jwt append the verified users id
    //in auth key to the request object
    secret : process.env.JWT_SECRET,
    userProperty:"auth"
})






