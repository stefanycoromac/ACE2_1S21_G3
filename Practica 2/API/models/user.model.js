const database = require('../config/database');

const userModel = {
    login: async (parameters) => {
        let query = `SELECT * FROM Usuario 
            WHERE nickname = :nickname AND contrasenia = :contrasenia`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows;
    },
    register: async (parameters) => {
        let query = `INSERT INTO Usuario (nombre, apellido, nickname, contrasenia) 
            VALUES (:nombre, :apellido, :nickname, :contrasenia)`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return {
            user,
            result
        };
    },

    update: async (parameters) => {
        let query = `UPDATE Usuario SET edad = :edad, genero = :genero,
                peso = :peso, estatura = :estatura
            WHERE idUsuario = :idUsuario`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        if (result.rowsAffected && result.rowsAffected === 1) {
            return {
                result,
                user
            };
        }
        return null;
    },
    getUser: async (parameters) => {
        let query = `SELECT * FROM Usuario 
            WHERE nickname = :nickname`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows;
    }
};

module.exports = userModel;