const express = require('express');
const router = express.Router();

const oxygenController = require('../controllers/oxygen.controller');

router.route('/').post(oxygenController.create);
router.route('/:idUsuario/top').get(oxygenController.getTop);
router.route('/:idUsuario/last').get(oxygenController.getLast);

router.route('/detail').post(oxygenController.createDetail);
router.route('/detail/:idUsuario/last').get(oxygenController.getDetail);

module.exports = router;