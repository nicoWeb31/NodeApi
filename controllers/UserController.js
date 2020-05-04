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