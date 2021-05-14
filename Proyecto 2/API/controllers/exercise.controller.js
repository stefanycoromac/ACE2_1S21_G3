const exerciseModel = require('../models/exercise.model');

const exerciseController = {
    create: async (req, res, next) => {
        try {
            let exercise = {
                idUsuario: req.body.idUsuario
            };

            exercise = await exerciseModel.create(exercise);

            res.status(200).send({
                code: '200',
                data: exercise
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

module.exports = exerciseController;