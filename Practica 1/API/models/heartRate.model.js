const oracledb = require('oracledb');
const database = require('../config/database');

const heartRateModel = {
    create: async (parameters) => {
        const query = `INSERT INTO RitmoCardiaco(idUsuario)
            VALUES(:idUsuario)
            RETURNING idRitmo INTO :idRitmo`;
        const heartRate = Object.assign({}, parameters);

        heartRate.idRitmo = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, heartRate);

        heartRate.idRitmo = result.outBinds.idRitmo[0];
        return {
            heartRate,
            result
        };
    },
    getTop: async (parameters) => {
        let query = `SELECT * FROM RitmoCardiaco
            WHERE idUsuario = :idUsuario
            ORDER BY fechaHora DESC
            FETCH NEXT 10 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },

    createDetail: async (parameters) => {
        const query = `INSERT INTO DetalleRitmo(medicion, idRitmo)
            VALUES(:medicion, :idRitmo)`;
        const detail = Object.assign({}, parameters);

        const result = await database(query, detail);

        return {
            detail,
            result
        };
    },

    getDetail: async (parameters) => {
        let query = `SELECT * FROM DetalleRitmo`;
    }
};

module.exports = heartRateModel;