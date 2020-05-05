const express = require('express');
//const postController = require('../controllers/PostController');
//destrucutring postController
const {getPosts,creatPost} = require('../controllers/PostController');
const {requireSingin} = require('../controllers/auth');
const {UserById} = require('../controllers/UserController');

const validator  = require('../validator')

const router = express.Router();
//const postController


router.get("/",getPosts);
router.post("/post",requireSingin, validator.createPostValoidator, creatPost);



//any route contening :useId , our app will first execute userbyID
router.param('userId',UserById)


module.exports = router;
