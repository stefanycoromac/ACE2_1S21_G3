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
    },
    update: async (parameters) => {
        const query = `UPDATE SesionEjercicio SET estado = :estado
            WHERE idSesion = :idSesion`;
        const test = Object.assign({}, parameters);

        const result = await database(query, test);
        if (result.rowsAffected && result.rowsAffected === 1) {
            return {
                result,
                test
            };
        }
        return null;
    },
};

module.exports = exerciseModel;