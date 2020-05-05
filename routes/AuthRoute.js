const express = require('express');
//const postController = require('../controllers/PostController');
//destrucutring postController
const {sinUp,singIn,singOut} = require('../controllers/auth');
const {UserById} = require('../controllers/UserController');

const {UserSinUpValidator}  = require('../validator');

const router = express.Router();
//const postController


router.post("/singup",UserSinUpValidator,sinUp);
router.post("/signin",singIn);
router.get("/singout",singOut);


//any route contening :useId , our app will first execute userbyID
router.param('userId',UserById)



module.exports = router;