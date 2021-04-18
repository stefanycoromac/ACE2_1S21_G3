const oracledb = require('oracledb');
const database = require('../config/database');

const vo2maxModel = {
    create: async (parameters) => {
        const query = `INSERT INTO VO2MAX(idUsuario)
            VALUES(:idUsuario)
            RETURNING idVO2MAX INTO :idVO2MAX`;
        const vo2max = Object.assign({}, parameters);

        vo2max.idVO2MAX = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, vo2max);

        vo2max.idVO2MAX = result.outBinds.idVO2MAX[0];
        return {
            vo2max,
            result
        };
    },
    update: async (parameters) => {
        const query = `UPDATE VO2MAX SET estado = :estado
            WHERE idVO2MAX = :idVO2MAX`;
        const vo2max = Object.assign({}, parameters);

        const result = await database(query, vo2max);
        if (result.rowsAffected && result.rowsAffected === 1) {
            return {
                result,
                vo2max
            };
        }
        return null;
    },

    get: async (parameters) => {
        let query = `SELECT * FROM VO2MAX 
            WHERE idUsuario = :idUsuario`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getLast: async (parameters) => {
        let query = `SELECT * FROM VO2MAX 
            WHERE idUsuario = :idUsuario`;
        const binds = {
            idUsuario: parameters.idUsuario
        };

        if (parameters.idVO2MAX) {
            binds.idVO2MAX = parameters.idVO2MAX;
            query += ` AND idVO2MAX = :idVO2MAX`;
        }

        query += ` ORDER BY idVO2MAX DESC
            FETCH NEXT 1 ROWS ONLY`;

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