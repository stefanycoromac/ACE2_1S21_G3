const express = require('express');
const router = express.Router();

const distanceController = require('../controllers/distance.controller');

router.route('/').post(distanceController.create);
router.route('/:idUsuario/last').get(distanceController.getLast);

module.exports = router;