const speedModel = require('../models/speed.model');

const speedController = {
    create: async (req, res, next) => {
        try {
            let speed = {
                idUsuario: req.body.idUsuario
            };
            speed = await speedModel.create(speed);

            res.status(200).send({
                code: '200',
                data: speed
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
            const rows = await speedModel.getLast(parameters);

            let speeds = [];
            rows.forEach(element => {
                speeds.push({
                    idVelocidad: element.IDVELOCIDAD,
                    medicion: element.MEDICION
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: speeds[0]
                });
            } else {
                res.status(200).send({
                    code: '404',
                    data: 'Not Found'
                });
            }
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
            let speed = {
                medicion: req.body.medicion,
                idVelocidad: req.body.idVelocidad
            };

            speed = await speedModel.createDetail(speed);

            res.status(200).send({
                code: '200',
                data: speed
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
};

module.exports = speedController;