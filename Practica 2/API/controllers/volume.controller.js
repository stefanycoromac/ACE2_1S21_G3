const volumeModel = require('../models/volume.model');

const volumeController = {
    createInhaled: async (req, res, next) => {
        try {
            let volume = {
                medicion: req.body.medicion,
                minuto: req.body.minuto,
                idVO2MAX: req.body.idVO2MAX,
            };

            volume = await volumeModel.createInhaled(volume);

            res.status(200).send({
                code: '200',
                data: volume
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
    createExhaled: async (req, res, next) => {
        try {
            let volume = {
                medicion: req.body.medicion,
                minuto: req.body.minuto,
                idVO2MAX: req.body.idVO2MAX,
            };

            volume = await volumeModel.createExhaled(volume);

            res.status(200).send({
                code: '200',
                data: volume
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    createInhaledRE: async (req, res, next) => {
        try {
            console.log(req.body);

            let volume = {
                medicion: req.body.medicion,
                idVO2MAX: req.body.idVO2MAX,
            };

            volume = await volumeModel.createInhaledRE(volume);
            console.log(volume);
            res.status(200).send({
                code: '200',
                data: volume
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
    createExhaledRE: async (req, res, next) => {
        try {
            console.log(req.body);

            let volume = {
                medicion: req.body.medicion,
                idVO2MAX: req.body.idVO2MAX,
            };

            volume = await volumeModel.createExhaledRE(volume);
            console.log(volume);
            res.status(200).send({
                code: '200',
                data: volume
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    }
};

module.exports = volumeController;