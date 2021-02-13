const express = require('express');
const router = express.Router();

const heartRateController = require('../controllers/heartRate.controller');

router.route('/:idUsuario/top').get(heartRateController.getTop);

module.exports = router;