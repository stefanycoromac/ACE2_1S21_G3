const oracledb = require('oracledb');
const database = require('../config/database');

const testModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Prueba(idUsuario)
            VALUES(:idUsuario)
            RETURNING idPrueba INTO :idPrueba`;
        const test = Object.assign({}, parameters);

        test.idPrueba = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, test);

        test.idPrueba = result.outBinds.idPrueba[0];
        return {
            test,
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
    }
};

module.exports = testModel;