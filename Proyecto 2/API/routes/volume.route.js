const express = require('express');
const router = express.Router();

const volumeController = require('../controllers/volume.controller');

router.route('/inhaled').post(volumeController.createInhaled);
router.route('/exhaled').post(volumeController.createExhaled);

router.route('/inhaledRE').post(volumeController.createInhaledRE);
router.route('/exhaledRE').post(volumeController.createExhaledRE);

module.exports = router;