const express = require('express');
const router = express.Router();

const heartRateController = require('../controllers/heartRate.controller');

router.route('/').post(heartRateController.create);
router.route('/:idUsuario/top').get(heartRateController.getTop);
router.route('/:idUsuario/last').get(heartRateController.getLast);

router.route('/detail').post(heartRateController.createDetail);
router.route('/detail/:idUsuario/last').get(heartRateController.getDetail);

module.exports = router;