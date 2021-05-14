const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exercise.controller');

router.route('/')
    .post(exerciseController.create)
    .put(exerciseController.update);

router.route('/:idUsuario/last').get(exerciseController.getLast);
router.route('/:idUsuario/top').get(exerciseController.getTop);

router.route('/per-week/:idUsuario').get(exerciseController.getPerWeek);

module.exports = router;