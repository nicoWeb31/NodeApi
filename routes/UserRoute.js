const express = require('express');
const {UserById,allUsers,getUser,useUpdate,deleteUser} = require('../controllers/UserController');
const {requireSingin} = require('../controllers/auth');


const router = express.Router();
//const postController


router.get("/users",allUsers);
router.get("/user/:userId",requireSingin,getUser);
router.put("/user/:userId",requireSingin,useUpdate);
router.delete("/user/:userId",requireSingin,deleteUser);








//any route contening :useId , our app will first execute userbyID
router.param('userId',UserById)


module.exports = router;