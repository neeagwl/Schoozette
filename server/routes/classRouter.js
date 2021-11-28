const express = require('express');
const router = express.Router();
const {createClass, joinClass,getClassById, getAllClassOfUser, addTopic, getClassLeaderboard} = require('../controllers/classController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createClass);

router.route('/join').post(protect,joinClass)

router.route('/:id').get(protect, getClassById);

router.route('/all/:id').get(protect, getAllClassOfUser)

router.route('/addTopic/:id').post(protect, addTopic)

router.route('/leaderboard/:id').get(protect, getClassLeaderboard)

module.exports= router;