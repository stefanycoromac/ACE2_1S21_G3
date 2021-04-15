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
                    nickname: element.NICKNAME
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
                contrasenia: req.body.contrasenia,
                edad: req.body.edad,
                genero: req.body.genero,
                peso: req.body.peso,
                estatura: req.body.estatura
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

    get: async (req, res, next) => {
        try {
            const parameters = {
                idUsuario: req.params.idUsuario
            };
            const rows = await userModel.get(parameters);

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
                    tipo: element.TIPO,
                    nickname: element.NICKNAME
                });
            });


            if (rows.length === 1) {
                res.status(200).send({
                    code: '200',
                    data: users[0]
                });
            } else {
                res.status(500).send({
                    code: '500',
                    data: users
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
            let user = {
                idUsuario: req.body.idUsuario,
                peso: req.body.peso
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