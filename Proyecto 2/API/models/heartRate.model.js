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
    getLast: async (parameters) => {
        let query = `SELECT * FROM RitmoCardiaco 
            WHERE idUsuario = :idUsuario
            ORDER BY idRitmo DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getTop: async (parameters) => {
        let query = `SELECT * FROM RitmoCardiaco
            WHERE idUsuario = :idUsuario
            ORDER BY idRitmo DESC
            FETCH NEXT 10 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    update: async (parameters) => {
        let query = `UPDATE RitmoCardiaco SET medicion = (
                SELECT ROUND(AVG(medicion), 2) FROM DetalleRitmo 
                    WHERE idRitmo = :idRitmo
            ) WHERE idRitmo = :idRitmo`;

        const heartRate = Object.assign({}, parameters);

        const result = await database(query, heartRate);
        if (result.rowsAffected && result.rowsAffected === 1) {
            return {
                result,
                heartRate
            };
        }
        return null;
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
        let query = `SELECT dr.idritmo, dr.iddetalleritmo, dr.medicion 
            FROM detalleritmo dr, (
            SELECT rc.idritmo, rc.medicion, 
                u.nombre, u.apellido 
            FROM RitmoCardiaco rc, Usuario u 
            WHERE rc.idusuario = :idUsuario
            ORDER BY rc.idritmo DESC 
            FETCH NEXT 1 ROWS ONLY
            ) a 
            WHERE dr.idritmo = a.idritmo
            ORDER BY dr.iddetalleritmo ASC`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    }
};

module.exports = heartRateModel;