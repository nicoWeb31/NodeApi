const express = require('express');
const postController = require('../controllers/PostController')

const router = express.Router();

router.get('/', postController.getPosts);


module.exports = router;
