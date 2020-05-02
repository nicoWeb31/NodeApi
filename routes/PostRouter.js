const express = require('express');
//const postController = require('../controllers/PostController');
//destrucutring postController
const {getPosts,creatPost} = require('../controllers/PostController');
// const validator  = require('../validator')

const router = express.Router();
//const postController
const postCtrl = 

router.get("/",getPosts);
router.post("/post",creatPost);



module.exports = router;
