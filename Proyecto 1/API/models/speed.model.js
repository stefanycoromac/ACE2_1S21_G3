const oracledb = require('oracledb');
const database = require('../config/database');

const speedModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Velocidad(idUsuario)
            VALUES(:idUsuario)
            RETURNING idVelocidad INTO :idVelocidad`;
        const speed = Object.assign({}, parameters);

        speed.idVelocidad = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };
        const result = await database(query, speed);

        speed.idVelocidad = result.outBinds.idVelocidad[0];
        return {
            speed,
            result
        };
    },
    getLast: async (parameters) => {
        const query = `SELECT * FROM Velocidad 
            WHERE idUsuario = :idUsuario
            ORDER BY idVelocidad DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },

    createDetail: async (parameters) => {
        const query = `INSERT INTO DetalleVelocidad(medicion, idVelocidad)
            VALUES(:medicion, :idVelocidad)`;
        const detail = Object.assign({}, parameters);

        const result = await database(query, detail);

        return {
            detail,
            result
        };
    }
};

module.exports = speedModel;