const courseNavetteModel = require('../models/courseNavette.model');

const couseNavetteController = {
    create: async (req, res, next) => {
        try {
            let courseNavette = {
                idUsuario: req.body.idUsuario
            };

            courseNavette = await courseNavetteModel.create(courseNavette);

            res.status(200).send({
                code: '200',
                data: courseNavette
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
            const rows = await courseNavetteModel.getLast(parameters);

            let tests = [];
            rows.forEach(element => {
                tests.push({
                    idTest: element.IDTEST,
                    estado: element.ESTADO,
                    fechaInicio: element.FECHAINICIO,
                    fechaFin: element.FECHAFIN,
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
    },
    update: async (req, res, next) => {
        try {
            let test = {
                idTest: req.body.idTest,
                estado: req.body.estado
            };
            test = await courseNavetteModel.update(test);

            if (test !== null) {
                res.status(200).send({
                    code: '200',
                    data: test
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: test
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
            let test = {
                idTest: req.body.idTest,
                numero: req.body.numero,
            };
            test = await courseNavetteModel.createDetail(test);

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
    getDetail: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario,
            };
            const rows = await courseNavetteModel.getDetail(parameters);

            let details = [];
            rows.forEach(element => {
                details.push({
                    idTest: element.IDTEST,
                    idUsuario: element.IDUSUARIO,
                    idRepeticion: element.IDREPETICION,
                    idVelocidad: element.IDVELOCIDAD,
                    numero: element.NUMERO,
                    promedio: element.PROMEDIO,
                    minVel: element.MINVEL,
                    maxVel: element.MAXVEL,
                    distancia: element.DISTANCIA,
                });
            });

            res.status(200).send({
                code: '200',
                data: details
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario,
                estado: req.body.estado,
            };
            const rows = await courseNavetteModel.getAll(parameters);

            let details = [];
            rows.forEach(element => {
                details.push({
                    idTest: element.IDTEST,
                    fechaInicio: element.FECHAINICIO,
                    estado: element.ESTADO,
                    repeticiones: element.TOTALREPETICIONES,
                });
            });

            res.status(200).send({
                code: '200',
                data: details
            });
        } catch (err) {
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
    getPerWeek: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario,
            };
            const rows = await courseNavetteModel.getPerWeek(parameters);

            let details = [];
            rows.forEach(element => {
                details.push({
                    inicio: element.SEMANA,
                    repMax: element.MAXIMO,
                    repMin: element.MINIMO,
                    promedio: element.PROMEDIO,
                });
            });

            res.status(200).send({
                code: '200',
                data: details
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

module.exports = couseNavetteController;