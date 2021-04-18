const express = require('express');
const router = express.Router();

const vo2maxController = require('../controllers/vo2max.controller');

router.route('/')
    .post(vo2maxController.create)
    .put(vo2maxController.update);

router.route('/:idUsuario').get(vo2maxController.get);
router.route('/:idUsuario/last/:idVO2MAX?').get(vo2maxController.getLast);
router.route('/detail/:idUsuario/:idVO2MAX?').get(vo2maxController.getDetail);

module.exports = router;