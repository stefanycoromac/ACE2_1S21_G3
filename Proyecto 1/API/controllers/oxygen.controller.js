const oxygenModel = require('../models/oxygen.model');

const oxygenController = {
    create: async (req, res, next) => {
        try {
            let oxygen = {
                idUsuario: req.body.idUsuario
            };

            oxygen = await oxygenModel.create(oxygen);

            res.status(200).send({
                code: '200',
                movilecode: '2',
                data: oxygen
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
            const rows = await oxygenModel.getLast(parameters);

            let oxygens = [];
            rows.forEach(element => {
                oxygens.push({
                    idOxigeno: element.IDOXIGENO,
                    medicion: element.MEDICION,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: oxygens[0]
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
            const rows = await oxygenModel.getTop(parameters);

            let oxygen = [];
            rows.forEach(element => {
                oxygen.push({
                    idOxigeno: element.IDOXIGENO,
                    medicion: element.MEDICION,
                    fechaHora: element.FECHAHORA,
                    idUsuario: element.IDUSUARIO
                });
            });

            res.status(200).send({
                code: '200',
                data: oxygen
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
            let oxygen = {
                medicion: req.body.medicion,
                idOxigeno: req.body.idOxigeno,
            };
            console.log(oxygen);
            oxygen = await oxygenModel.createDetail(oxygen);

            res.status(200).send({
                code: '200',
                data: oxygen
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
            const rows = await oxygenModel.getDetail(parameters);

            let oxygens = [];
            rows.forEach(element => {
                oxygens.push({
                    idOxigeno: element.IDOXIGENO,
                    idDetalleOxigeno: element.IDDETALLEOXIGENO,
                    medicion: element.MEDICION,
                });
            });

            res.status(200).send({
                code: '200',
                data: oxygens
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

module.exports = oxygenController;