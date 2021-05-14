const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercise.controller');

router.route('/').post(exerciseController.create);

module.exports = router;