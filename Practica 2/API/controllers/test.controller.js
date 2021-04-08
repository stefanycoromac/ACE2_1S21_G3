const testModel = require('../models/test.model');

const testController = {
    create: async (req, res, next) => {
        try {
            let test = {
                idUsuario: req.body.idUsuario
            };

            test = await testModel.create(test);

            res.status(200).send({
                code: '200',
                data: test
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
            const rows = await testModel.getLast(parameters);

            let tests = [];
            rows.forEach(element => {
                tests.push({
                    idPrueba: element.IDPRUEBA,
                    fecha: element.FECHA,
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
                    data: tests[0]
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

module.exports = testController;