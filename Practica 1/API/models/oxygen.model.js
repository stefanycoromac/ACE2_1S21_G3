const oracledb = require('oracledb');
const database = require('../config/database');

const oxygenModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Oxigeno(idUsuario)
        VALUES(:idUsuario)
        RETURNING idOxigeno INTO :idOxigeno`;
        const oxygen = Object.assign({}, parameters);

        oxygen.idOxigeno = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, oxygen);

        oxygen.idOxigeno = result.outBinds.idOxigeno[0];
        return {
            oxygen,
            result
        };
    },
    getTop: async (parameters) => {
        let query = `SELECT * FROM Oxigeno
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
        const query = `INSERT INTO DetalleOxigeno(medicion, idOxigeno)
            VALUES(:medicion, :idOxigeno)`;
        const detail = Object.assign({}, parameters);

        const result = await database(query, detail);

        return {
            detail,
            result
        };
    },
};

module.exports = oxygenModel;