const exerciseModel = require('../models/exercise.model');

const exerciseController = {
    create: async (req, res, next) => {
        try {
            let exerciseSession = {
                idUsuario: req.body.idUsuario,
                metaCalorias: req.body.metaCalorias,
            };
            exerciseSession = await exerciseModel.create(exerciseSession);

            res.status(200).send({
                code: '200',
                data: exerciseSession
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
            let exerciseSession = {
                idSesion: req.body.idSesion,
                noPasos: req.body.noPasos
            };
            exerciseSession = await exerciseModel.update(exerciseSession);

            if (exerciseSession != null) {
                res.status(200).send({
                    code: '200',
                    data: exerciseSession
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: exerciseSession
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
    updateStatus: async (req, res, next) => {
        try {
            let exerciseSession = {
                idSesion: req.body.idSesion,
                estado: req.body.estado
            };
            exerciseSession = await exerciseModel.updateStatus(exerciseSession);

            if (exerciseSession != null) {
                res.status(200).send({
                    code: '200',
                    data: exerciseSession
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: exerciseSession
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
            const rows = await exerciseModel.getLast(parameters);

            let steps = [];
            rows.forEach(element => {
                steps.push({
                    idSesion: element.IDSESION,
                    estado: element.ESTADO,
                    fechaInicio: element.FECHAINICIO,
                    fechaFin: element.FECHAFIN,
                    noPasos: element.NOPASOS,
                    metaPasos: element.METAPASOS,
                    metaCalorias: element.METACALORIAS,
                    caloriasQuemadas: element.CALORIASQUEMADAS
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: steps[0]
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

            const rows = await exerciseModel.getTop(parameters);

            let sessions = [];
            rows.forEach(element => {
                sessions.push({
                    idSesion: element.IDSESION,
                    estado: element.ESTADO,
                    fechaInicio: element.FECHAINICIO,
                    fechaFin: element.FECHAFIN,
                    noPasos: element.NOPASOS,
                    metaPasos: element.METAPASOS,
                    metaCalorias: element.METACALORIAS,
                    caloriasQuemadas: element.CALORIASQUEMADAS
                });
            });

            res.status(200).send({
                code: '200',
                data: sessions
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
            const rows = await exerciseModel.getPerWeek(parameters);

            let details = [];
            rows.forEach(element => {
                let dataDate = getDatePerWeek(element.SEMANA, 2021)
                details.push({
                    inicio: element.SEMANA,
                    date: dataDate,
                    pasosMax: element.MAXIMO,
                    pasosMin: element.MINIMO,
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

function getDatePerWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    var date = ISOweekStart.getDate() + '/' + (ISOweekStart.getMonth() + 1) + '/' + ISOweekStart.getFullYear();
    return date;
}

module.exports = exerciseController;