const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

// GET 5 POSTS
router.get('/:offset', auth, postCtrl.getFivePostsAndTheirReplies);

// ADD TO READ-POSTS WHEN A POST IS READ
router.post('/read/:postId', auth, postCtrl.addToReadPosts);

// ADD A POST
router.post('/', auth, postCtrl.addPost);

// ADD A REPLY
router.post('/:parentId', auth, postCtrl.addReply);

// DELETE A POST
router.delete('/:postId', auth, postCtrl.deletePost);

// UPDATE A POST
router.put('/:postId', auth, postCtrl.updatePost);

module.exports = router;