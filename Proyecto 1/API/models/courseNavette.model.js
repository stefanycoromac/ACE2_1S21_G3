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
            ORDER BY fechaInicio DESC
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
            WHERE idtest IN (SELECT idTest FROM Test 
                WHERE idUsuario = :idUsuario
                ORDER BY fechaInicio DESC
                FETCH NEXT 1 ROWS ONLY)
            ORDER BY idTest DESC`;

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
        let query = `SELECT DISTINCT a.Semana,
            MAX(a.repeticionesTest) OVER (PARTITION BY a.Semana) AS Maximo,
            MIN(a.repeticionesTest) OVER (PARTITION BY a.Semana)  AS minimo,
            ROUND(AVG(a.repeticionesTest) OVER (PARTITION BY a.Semana), 2) AS Promedio 
            FROM 
            (
                SELECT t.idTest, TO_CHAR(t.fechaInicio, 'iw') AS Semana , t.fechaInicio,
                    t.estado, COUNT(r.idRepeticion) AS repeticionesTest
                FROM TEST t , REPETICION r 
                WHERE t.idTest = r.idTest AND  t.idUsuario = :idUsuario
                GROUP BY t.idTest, TO_CHAR(t.fechaInicio, 'iw'), t.fechaInicio, t.estado
                ORDER BY TO_CHAR(t.fechaInicio, 'iw') 
            ) a
            ORDER BY a.Semana ASC`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows
    },
};

module.exports = courseNavetteModel;