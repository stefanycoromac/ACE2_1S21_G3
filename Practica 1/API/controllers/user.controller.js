const userModel = require('../models/user.model');

const userController = {
    login: async (req, res, next) => {
        try {
            const parameters = {
                nickname: req.body.nickname,
                contrasenia: req.body.contrasenia
            };
            const rows = await userModel.login(parameters);

            let userLog = [];
            rows.forEach(element => {
                userLog.push({
                    idUsuario: element.IDUSUARIO,
                    nombre: element.NOMBRE,
                    apellido: element.APELLIDO,
                    edad: element.EDAD,
                    genero: element.GENERO,
                    peso: element.PESO,
                    estatura: element.ESTATURA,
                    tipo: element.TIPO,
                    nickname: element.NICKNAME,
                    contrasenia: element.CONTRASENIA
                });
            });

            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: userLog[0]
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

    getUser: async (req, res, next) => {},

    coaching: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await userModel.coaching(parameters);

            let users = [];
            rows.forEach(element => {
                users.push({
                    idUsuario: element.IDUSUARIO,
                    nombre: element.NOMBRE,
                    apellido: element.APELLIDO,
                    edad: element.EDAD,
                    genero: element.GENERO,
                    peso: element.PESO,
                    estatura: element.ESTATURA,
                });
            });

            res.status(200).send({
                code: '200',
                data: users
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

module.exports = userController;