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
    getLast: async (parameters) => {
        let query = `SELECT * FROM Oxigeno 
            WHERE idUsuario = :idUsuario
            ORDER BY fechaHora DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
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
    getDetail: async (parameters) => {
        let query = `SELECT do.idoxigeno, do.iddetalleoxigeno, do.medicion
            FROM detalleoxigeno do, 
                (   
                    SELECT  o.idoxigeno FROM Oxigeno o, usuario u 
                    WHERE o.idusuario = :idUsuario 
                    ORDER BY o.idoxigeno DESC 
                    FETCH NEXT 1 ROWS ONLY
                ) a
            WHERE do.idoxigeno = a.idoxigeno
            ORDER BY do.iddetalleoxigeno ASC`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    }
};

module.exports = oxygenModel;