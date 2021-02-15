const heartRateModel = require('../models/heartRate.model');

const heartRateController = {
    create: async (req, res, next) => {
        try {
            let heartRate = {
                idUsuario: req.body.idUsuario
            };

            heartRate = await heartRateModel.create(heartRate);

            res.status(200).send({
                code: '200',
                data: heartRate
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    getLast: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await heartRateModel.getLast(parameters);

            let heartRates = [];
            rows.forEach(element => {
                heartRates.push({
                    idRitmo: element.IDRITMO,
                    medicion: element.MEDICION,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            res.status(200).send({
                code: '200',
                data: heartRates[0]
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    getTop: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await heartRateModel.getTop(parameters);

            let heartRates = [];
            rows.forEach(element => {
                heartRates.push({
                    idRitmo: element.IDRITMO,
                    medicion: element.MEDICION,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            res.status(200).send({
                code: '200',
                data: heartRates
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    createDetail: async (req, res, next) => {
        try {
            let heartRate = {
                medicion: req.body.medicion,
                idRitmo: req.body.idRitmo,
            };

            heartRate = await heartRateModel.createDetail(heartRate);

            res.status(200).send({
                code: '200',
                data: heartRate
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    getDetail: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await heartRateModel.getDetail(parameters);

            let heartRates = [];
            rows.forEach(element => {
                heartRates.push({
                    idRitmo: element.IDRITMO,
                    idDetalleRitmo: element.IDDETALLERITMO,
                    medicion: element.MEDICION,
                });
            });

            res.status(200).send({
                code: '200',
                data: heartRates
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

module.exports = heartRateController;