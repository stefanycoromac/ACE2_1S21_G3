const vo2maxModel = require('../models/vo2max.model');

const vo2maxController = {
    create: async (req, res, next) => {
        try {
            let vo2max = {
                idUsuario: req.body.idUsuario
            };

            vo2max = await vo2maxModel.create(vo2max);

            res.status(200).send({
                code: '200',
                data: vo2max
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            let vo2max = {
                idVO2MAX: req.body.idVO2MAX,
                estado: req.body.estado
            };
            vo2max = await vo2maxModel.update(vo2max);

            if (vo2max !== null) {
                res.status(200).send({
                    code: '200',
                    data: vo2max
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: vo2max
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

    getLast: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await vo2maxModel.getLast(parameters);

            let vo2maxs = [];
            rows.forEach(element => {
                vo2maxs.push({
                    idPrueba: element.IDPRUEBA,
                    fecha: element.FECHA,
                    estado: element.ESTADO,
                    minInh: element.MIN_INH,
                    maxInh: element.MAX_INH,
                    avgInh: element.AVG_INH,
                    minExh: element.MIN_EXH,
                    maxExh: element.MAX_EXH,
                    avgExh: element.AVG_EXH,
                    medicion: element.MEDICION,
                    idUsuario: element.IDUSUARIO
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: vo2maxs[0]
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
    getDetail: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await vo2maxModel.getDetail(parameters);

            let vo2max = [];
            rows.forEach(element => {
                vo2max.push({
                    id: element.ID,
                    medicion: element.MEDICION,
                });
            });

            res.status(200).send({
                code: '200',
                data: vo2max
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

module.exports = vo2maxController;