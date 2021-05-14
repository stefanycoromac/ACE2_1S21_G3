const exerciseModel = require('../models/exercise.model');

const exerciseController = {
    create: async (req, res, next) => {
        try {
            let exerciseSession = {
                idUsuario: req.body.idUsuario
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
                estado: req.body.estado
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
    }
}

module.exports = exerciseController;