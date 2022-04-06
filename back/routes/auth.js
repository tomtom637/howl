const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const oneself = require('../middleware/oneself');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

// GET ALL USERS AND THEIR STATS
router.get('/', auth, userCtrl.getAllUsers);

// GET A USER
router.get('/:userId', auth, userCtrl.getUser);

// GET USER INFOS FROM TOKEN
router.post('/own', userCtrl.getUserFromToken);

// REGISTER A NEW USER
router.post('/signup', userCtrl.signup);

// LOGIN A USER
router.post('/login', userCtrl.login);

// UPDATE USER'S MOTTO
router.put('/motto/:userId', oneself, userCtrl.updateUserMotto);

// UPDATE USER'S PICTURE
router.put('/picture/:userId', oneself, multer, userCtrl.updateUserPicture);

// UPDATE USER'S ROLE
router.put('/role/:userId', admin, userCtrl.updateUserRole);

// SOFT DELETE A USER
router.delete('/:userId', admin, userCtrl.softDeleteUser);

module.exports = router;
