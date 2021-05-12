const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        Nombre: 'Grupo 3',
        Curso: 'Arquitectura de Computadores y Ensambladores 2'
    });
});

module.exports = router;