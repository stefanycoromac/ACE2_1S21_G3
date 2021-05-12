const express = require('express');
const router = express.Router();

const speedController = require('../controllers/speed.controller');

router.route('/').post(speedController.create);
router.route('/:idUsuario/last').get(speedController.getLast);

router.route('/detail').post(speedController.createDetail);

module.exports = router;