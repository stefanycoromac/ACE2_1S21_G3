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
        let query = `SELECT * FROM repeticionTest
            WHERE idUsuario = :idUsuario
            ORDER BY idTest DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    }
};

module.exports = courseNavetteModel;