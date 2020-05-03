const User = require('../models/ModelUser')

exports.sinUp = async(req,res)=>{
    const userExists = await User.findOne({email:req.body.email}) ;
    if(userExists) return res.status(403).json({
        error : "Email is taken"
    })
   let  user = await new User(req.body)
    await user.save()
    res.status(200).json({message : "signup success with module"})
}