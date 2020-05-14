const express = require('express');
const postController = require('../controllers/PostController');
//destrucutring postController
const {getPosts,creatPost,postBYId,deletePost,isPoster,updatePost} = require('../controllers/PostController');
const {requireSingin} = require('../controllers/auth');
const {UserById} = require('../controllers/UserController');

const validator  = require('../validator')

const router = express.Router();
//const postController


router.get("/",getPosts);
router.post("/post/new/:userId",requireSingin,creatPost,validator.createPostValoidator);
router.get("/posts/:userId",postController.postsByUser);
router.delete("post/:postById",requireSingin,isPoster,deletePost);
router.put("post/:postById",requireSingin,updatePost)




//any route contening :useId , our app will first execute userbyID
router.param('userId',UserById)

//any route contening :postId , our app will first execute userbyID
router.param('postById',postBYId)


module.exports = router;
