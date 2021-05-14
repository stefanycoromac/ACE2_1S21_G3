const exerciseSessionModel = require('../models/exerciseSession.model');

const exerciseSessionController = {
    create: async(req, res, next) => {
        try{
            let exerciseSession = {
                idUsuario: req.body.idUsuario
            };

            exerciseSession = await exerciseSessionModel.create(exerciseSession);

            res.status(200).send({
                code: '200',
                data: exerciseSession
            });
        }catch(err){
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    },
    update: async(req, res, next) => {
        try{
            let exerciseSession = {
                idSesion: req.body.idSesion,
                estado: req.body.estado
            };
            exerciseSession = await exerciseSessionModel.update(exerciseSession);

            if(exerciseSession != null){
                res.status(200).send({
                    code: '200',
                    data: exerciseSession
                });
            }else{
                res.status(500).send({
                    code: '500',
                    data: exerciseSession
                });
            }
        }catch(err){
            res.status(500).send({
                code: '500',
                data: err
            });
            next(err);
        }
    }
}

module.exports = exerciseSessionController;