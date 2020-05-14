const Post = require('../models/ModelsPosts')
const formidable = require ('formidable');
const fs = require('fs');
const _ = require('lodash');





exports.postBYId = (req,res,next,id)=>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({error:err});
        };
        req.post = post
        next()
    })

}


// =============================================================================
// get post
// =============================================================================
exports.getPosts = (req,res) => {
    
const posts = Post.find()
.populate("postedBy","_id name")
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
exports.creatPost =(req,res,next)=> {

    let form = new formidable.IncomingForm();
    form.keepExtensions= true;

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error : "Image could not be uploaded" 
            });
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        
        post.postedBy = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error : err
                })
            }
            res.json(result);
        })
    })
    
};

    // =========================================================================
    // post buy user
    // =========================================================================

    exports.postsByUser = (req,res)=>{
        Post.find({postedBy : req.profile._id})
        .populate('postedBy', "_id name")
        .sort("created")
        .exec((err,posts)=>{
            if(err){
                return res.status(400).json({error : err});
            }
            res.json({posts})
        });
    };



    // =========================================================================
    // delete post deletePost
    // =========================================================================
    exports.deletePost = (req,res) =>{
        let post = req.post;
        post.remove((err,post)=>{
            if(err){
                return res.status(400).json({error : err});
            }

            res.json({message : "deleted with success"})
        })
    }




    // =========================================================================
    // isPoster
    // =========================================================================


    exports.isPoster =(req,res,next) =>{
        let isPpster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

        if(!isPpster){
            return res.status(403).json({error: "User is not autorized"});
        }
        next();
    }


    // =========================================================================
    // update
    // =========================================================================

    exports.updatePost = (req,res,next) =>{
        let post = req.post;
        post = _.extend(post,req.body);
        post.updated = Date.now();
        post.save(err=>{
            if(err){
                return res.status(400).json({error : err})
            }
            res.json(post);

        });

    };

    // const post = new  Post(req.body);
    // console.log("creat post",(req.body))

    // // post.save((err,succ)=>{
    // //     if(err){
    // //         return res.status(400).json({error:err})
    // //     }
    // //     res.status(200).json({post:succ})
    // // })

    // post.save()
    // .then(result=>res.status(200).json({post:result}))