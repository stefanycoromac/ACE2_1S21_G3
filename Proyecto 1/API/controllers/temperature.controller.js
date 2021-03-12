const temperatureModel = require('../models/temperature.model');

const temperatureController = {
    create: async (req, res, next) => {
        try {
            let temperature = {
                idUsuario: req.body.idUsuario
            };

            temperature = await temperatureModel.create(temperature);

            res.status(200).send({
                code: '200',
                movilecode: '3',
                data: temperature
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
            const rows = await temperatureModel.getLast(parameters);

            let temperatures = [];
            rows.forEach(element => {
                temperatures.push({
                    idTemperatura: element.IDTEMPERATURA,
                    promedio: element.PROMEDIO,
                    minima: element.MINTEMP,
                    maxima: element.MAXTEMP,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: temperatures[0]
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

    getTop: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };

            const rows = await temperatureModel.getTop(parameters);

            let temperatures = [];
            rows.forEach(element => {
                temperatures.push({
                    idTemperatura: element.IDTEMPERATURA,
                    promedio: element.PROMEDIO,
                    minima: element.MINTEMP,
                    maxima: element.MAXTEMP,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            res.status(200).send({
                code: '200',
                data: temperatures
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
            console.log(req.body);
            let temperature = {
                medicion: req.body.medicion,
                idTemperatura: req.body.idTemperatura,
            };
            console.log(temperature);

            temperature = await temperatureModel.createDetail(temperature);

            res.status(200).send({
                code: '200',
                data: temperature
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

module.exports = temperatureController;