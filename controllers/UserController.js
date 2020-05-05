const _ = require('lodash');
const User = require('../models/ModelUser');

exports.UserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({error : "User not found"})
        }
        req.profile = user //adds profiles objet in req with user info
        next();
    })
}


exports.hasAutorization = (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id  === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "user is not autorizeq to perform this action "
        })
    }
}


//all user
exports.allUsers = (req,res) =>{
    User.find((err,users)=>{
        if(err) {
            return res.status(400).json({
                error : err
            })
        }
        res.json({users : users})
    }).select("name email updated created")
}

//single user
exports.getUser = (req,res) =>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;


    return res.json(req.profile)
}


//update user
exports.useUpdate = (req,res,next) =>{
    let user = req.profile
    user = _.extend(user,req.body)
    user.updated = Date.now()
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error: "you are not authorized to perform this action"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({user:user})
    })
}


//delete user
exports.deleteUser = (req,res,next) =>{
    let user = req.profile;
    user.remove((err,user)=>{
        if(err){
            res.status(400).json({
                error:err
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({message:"User deleted successfuly"})
    })
}
