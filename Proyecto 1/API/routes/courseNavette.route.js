const express = require('express');
const router = express.Router();

const courseNavette = require('../controllers/courseNavette.controller');

router.route('/').post(courseNavette.create)
    .put(courseNavette.update);
router.route('/:idUsuario/last').get(courseNavette.getLast);

router.route('/detail').post(courseNavette.createDetail);
router.route('/detail/:idUsuario/last').get(courseNavette.getDetail);

router.route('/all/:idUsuario').get(courseNavette.getAll);
router.route('/all/:idUsuario').post(courseNavette.getAll);

module.exports = router;