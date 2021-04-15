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
        let query = `INSERT INTO Usuario (nombre, apellido, nickname,
                contrasenia, edad, genero, peso, estatura)
            VALUES (:nombre, :apellido, :nickname, :contrasenia,
                :edad, :genero, :peso, :estatura)`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return {
            user,
            result
        };
    },


    get: async (parameters) => {
        let query = `SELECT * FROM Usuario 
            WHERE idUsuario = :idUsuario`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows;
    },
    update: async (parameters) => {
        let query = `UPDATE Usuario SET peso = :peso 
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
    }
};

module.exports = userModel;