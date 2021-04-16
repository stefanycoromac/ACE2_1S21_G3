const express = require('express');
const router = express.Router();

const volumeController = require('../controllers/volume.controller');

router.route('/inhaled').post(volumeController.createInhaled);
router.route('/exhaled').post(volumeController.createExhaled);

module.exports = router;