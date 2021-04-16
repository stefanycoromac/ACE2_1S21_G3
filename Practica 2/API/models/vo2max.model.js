const oracledb = require('oracledb');
const database = require('../config/database');

const vo2maxModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Prueba(idUsuario)
            VALUES(:idUsuario)
            RETURNING idPrueba INTO :idPrueba`;
        const vo2max = Object.assign({}, parameters);

        vo2max.idPrueba = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, vo2max);

        vo2max.idPrueba = result.outBinds.idPrueba[0];
        return {
            vo2max,
            result
        };
    },

    getLast: async (parameters) => {
        let query = `SELECT * FROM Prueba 
            WHERE idUsuario = :idUsuario
            ORDER BY idPrueba DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getDetail: async (parameters) => {
        let query = ``;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    }
};

module.exports = vo2maxModel;