const Post = require('../models/ModelsPosts')

exports.getPosts = (req,res) => {
    res.json({
        posts :[
            {title:'first post'},
            {title:'seconde post'},
            
        ]
    })
};


exports.creatPost =(req,res)=> {
    const post = new  Post(req.body);
    console.log("creat post",(req.body))

    post.save((err,succ)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({post:succ})
    })

    // post.save()
    // .then(result=>res.satus(200).json({post:result}))
};