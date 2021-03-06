const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/category');

// GET ALL CATEGORIES
router.get('/', auth, userCtrl.getAllCategories);

// GET THE FIRST 5 POSTS FROM OFFSET AND ITS REPLIES ASSOCIATED WITH A CATEGORY
router.get('/:categoryId/:offset', auth, userCtrl.getFivePostsAndTheirRepliesFromCategory);

// REGISTER A NEW CATEGORY
router.post('/', admin, userCtrl.addCategory);

// UPDATE A CATEGORY NAME
router.put('/name/:categoryId', admin, userCtrl.updateCategoryName);

// UPDATE A CATEGORY DESCRIPTION
router.put('/description/:categoryId', admin, userCtrl.updateCategoryDescription);

// UPDATE A CATEGORY'S PICTURE
router.put('/picture/:categoryId', admin, multer, userCtrl.updateCategoryPicture);

// DELETE A CATEGORY AND ITS ASSOCIATED POSTS
router.delete('/:categoryId', admin, userCtrl.deleteCategory);

module.exports = router;