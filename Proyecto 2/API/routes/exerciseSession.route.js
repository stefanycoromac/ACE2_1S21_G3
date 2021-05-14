const express = require('express');
const router = express.Router();

const exerciseSessionController = require('../controllers/exerciseSession.controller');

router.route('/')
    .post(exerciseSessionController.create)
    .put(exerciseSessionController.update);

router.route('/gg').get( (req, res) => { res.send('ExerciseSession Route Works'); });

module.exports = router;