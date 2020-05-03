const express = require('express');
//const postController = require('../controllers/PostController');
//destrucutring postController
const {sinUp} = require('../controllers/auth');
const {UserSinUpValidator}  = require('../validator')

const router = express.Router();
//const postController


router.post("/singup",UserSinUpValidator,sinUp);



module.exports = router;