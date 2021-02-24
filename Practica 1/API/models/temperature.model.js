const oracledb = require('oracledb');
const database = require('../config/database');

const temperatureModel = {
    create: async (parameters) => {
        const query = `INSERT INTO TEMPERATURA(idUsuario)
            VALUES(:idUsuario)
            RETURNING idTemperatura INTO :idTemperatura`;
        const temperature = Object.assign({}, parameters);

        temperature.idTemperatura = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, temperature);

        temperature.idTemperatura = result.outBinds.idTemperatura[0];
        return {
            temperature,
            result
        };
    },
    getLast: async (parameters) => {
        let query = `SELECT * FROM Temperatura 
            WHERE idUsuario = :idUsuario
            ORDER BY idTemperatura DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getTop: async (parameters) => {
        let query = `SELECT * FROM Temperatura
            WHERE idUsuario = :idUsuario
            ORDER BY idTemperatura DESC
            FETCH NEXT 10 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },

    createDetail: async (parameters) => {
        const query = `INSERT INTO DetalleTemperatura(medicion, idTemperatura)
            VALUES(:medicion, :idTemperatura)`;
        const detail = Object.assign({}, parameters);

        const result = await database(query, detail);

        return {
            detail,
            result
        };
    }
};

module.exports = temperatureModel;