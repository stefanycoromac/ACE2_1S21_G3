const express = require('express');
const router = express.Router();

const testController = require('../controllers/test.controller');

router.route('/').post(testController.create);
router.route('/:idUsuario/last').get(testController.getLast);

module.exports = router;