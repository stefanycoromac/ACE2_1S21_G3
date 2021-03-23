const oracledb = require('oracledb');
const database = require('../config/database');

const courseNavetteModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Test(idUsuario)
            VALUES(:idUsuario)
            RETURNING idTest INTO :idTest`;
        const test = Object.assign({}, parameters);

        test.idTest = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, test);

        test.idTest = result.outBinds.idTest[0];
        return {
            test,
            result
        };
    },
    getLast: async (parameters) => {
        const query = `SELECT * FROM Test 
            WHERE idUsuario = :idUsuario
            ORDER BY idTest DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    update: async (parameters) => {
        const query = `UPDATE Test SET estado = :estado
            WHERE idTest = :idTest`;
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

    createDetail: async (parameters) => {
        const query = `INSERT INTO Repeticion(idTest, numero)
            VALUES(:idTest, :numero)
            RETURNING idRepeticion INTO :idRepeticion`;
        const repetition = Object.assign({}, parameters);

        repetition.idRepeticion = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, repetition);

        repetition.idRepeticion = result.outBinds.idRepeticion[0];
        return {
            repetition,
            result
        };
    },
    getDetail: async (parameters) => {
        const query = `SELECT * FROM repeticionTest
            WHERE idUsuario = :idUsuario
            ORDER BY idTest DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },

    getAll: async (parameters) => {
        let query = `SELECT t.idTest, t.fechaInicio, t.estado, 
                COUNT(r.idRepeticion) AS TotalRepeticiones
            FROM TEST t, REPETICION r
            WHERE t.idUsuario = :idUsuario AND t.idTest = r.idTest`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        if (parameters.estado) {
            binds.estado = parameters.estado;
            query += ` AND t.estado = :estado`;
        }

        query += ` GROUP BY t.idTest, t.fechaInicio, t.estado
            ORDER BY t.fechaInicio`;
        const result = await database(query, binds);
        return result.rows
    },
    getPerWeek: async (parameters) => {
        let query = `SELECT * FROM TEST t
            WHERE t.idUsuario = :idUsuario`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows
    },
};

module.exports = courseNavetteModel;