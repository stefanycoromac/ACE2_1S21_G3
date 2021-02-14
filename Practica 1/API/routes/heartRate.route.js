const express = require('express');
const router = express.Router();

const heartRateController = require('../controllers/heartRate.controller');

router.route('/').post(heartRateController.create);
router.route('/:idUsuario/top').get(heartRateController.getTop);

router.route('/detail').post(heartRateController.createDetail);

module.exports = router;