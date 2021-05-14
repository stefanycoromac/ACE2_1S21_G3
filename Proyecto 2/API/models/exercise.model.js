const oracledb = require('oracledb');
const database = require('../config/database');

const exerciseModel = {
    create: async (parameters) => {
        const query = `INSERT INTO SesionEjercicio(idUsuario)
            VALUES(:idUsuario)
            RETURNING idSesion INTO :idSesion`;
        const exercise = Object.assign({}, parameters);

        exercise.idSesion = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, exercise);

        exercise.idSesion = result.outBinds.idSesion[0];
        return {
            exercise,
            result
        };
    }
};

module.exports = exerciseModel;