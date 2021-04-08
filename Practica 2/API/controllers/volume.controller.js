const volumeModel = require('../models/volume.model');

const volumeController = {
    create: async (req, res, next) => {
        try {
            let volume = {
                inhalado: req.body.inhalado,
                exhalado: req.body.exhalado,
                minuto: req.body.minuto,
                idPrueba: req.body.idPrueba,
            };

            volume = await volumeModel.create(volume);

            res.status(200).send({
                code: '200',
                data: volume
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

module.exports = volumeController;