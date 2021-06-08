const express = require('express');
const router  = express.Router();
const postController = require('../controller/postController');
const auth = require('../middleware/auth');

router.post('/create_post',auth,postController.createPost);

router.get('/posts/:id',postController.fetchPosts);

router.post('/updateImage',auth,postController.updateImage)

router.patch('/update',[auth,postController.updateValidations],postController.updatePost);

router.get('/post/:id',auth,postController.fetchPost)

router.get('/delete/:id',auth,postController.deletePost);

router.get('/home',postController.getAllPost)

module.exports= router;