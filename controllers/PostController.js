const Post = require('../models/ModelsPosts')



// =============================================================================
// get post
// =============================================================================
exports.getPosts = (req,res) => {
    
const posts = Post.find()
//select what you want whith select mmethode
.select("_id title body")
.then((posts) =>{
    res.json({posts})
    //res.status(200).json({posts})

})
.catch(err=>console.log(err))


    
};


// =============================================================================
// creats post
// =============================================================================
exports.creatPost =(req,res)=> {
    const post = new  Post(req.body);
    console.log("creat post",(req.body))

    // post.save((err,succ)=>{
    //     if(err){
    //         return res.status(400).json({error:err})
    //     }
    //     res.status(200).json({post:succ})
    // })

    post.save()
    .then(result=>res.status(200).json({post:result}))
};