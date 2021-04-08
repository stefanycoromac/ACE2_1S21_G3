const express = require('express');
const router = express.Router();

const volumeController = require('../controllers/volume.controller');

router.route('/').post(volumeController.create);

module.exports = router;