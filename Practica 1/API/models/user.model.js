const database = require('../config/database');

const userModel = {
    login: async (parameters) => {
        let query = `SELECT * FROM Usuario 
            WHERE nickname = :nickname AND contrasenia = :contrasenia`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows
    },
    getUser: async (parameters) => {
        let query = `SELECT * FROM Usuario 
            WHERE nickname = :nickname`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows
    },

    coaching: async (parameters) => {
        let query = `SELECT * FROM coaching WHERE IDCOACH = :idUsuario`;
        const user = Object.assign({}, parameters);

        const result = await database(query, user);
        return result.rows
    }
};

module.exports = userModel;