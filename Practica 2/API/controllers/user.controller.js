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
    register: async (req, res, next) => {
        try {
            const parameters = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nickname: req.body.nickname,
                contrasenia: req.body.contrasenia
            };
            const user = await userModel.register(parameters);

            res.status(200).send({
                code: '200',
                data: user
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
            let user = {
                idUsuario: req.body.idUsuario,
                edad: req.body.edad,
                genero: req.body.genero,
                peso: req.body.peso,
                estatura: req.body.estatura
            };
            user = await userModel.update(user);

            if (user !== null) {
                res.status(200).send({
                    code: '200',
                    data: user
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: user
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

module.exports = userController;