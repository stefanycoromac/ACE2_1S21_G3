const express = require('express');
const router = express.Router();

const temperatureController = require('../controllers/temperature.controller');

router.route('/').post(temperatureController.create);
router.route('/:idUsuario/top').get(temperatureController.getTop);
router.route('/:idUsuario/last').get(temperatureController.getLast);

router.route('/detail').post(temperatureController.createDetail);

module.exports = router;