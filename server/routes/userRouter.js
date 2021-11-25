const express = require('express');
const router = express.Router();
const {authUser, registerUser, getUserById} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');



router.route('/register').post(registerUser);

router.post('/login',authUser);

router.route('/:id').get(protect,getUserById);


module.exports= router;