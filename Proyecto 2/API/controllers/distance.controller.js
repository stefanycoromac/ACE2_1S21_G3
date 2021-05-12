const distanceModel = require('../models/distance.model');

const distanceController = {
    create: async (req, res, next) => {
        try {
            let distance = {
                idRepeticion: req.body.idRepeticion,
                medicion: req.body.medicion
            }
            distance = await distanceModel.create(distance);

            res.status(200).send({
                code: '200',
                data: distance
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
            const rows = await distanceModel.getLast(parameters);

            let distances = [];
            rows.forEach(element => {
                distances.push({
                    medicion: element.MEDICION
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: distances[0]
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
    }
};

module.exports = distanceController;