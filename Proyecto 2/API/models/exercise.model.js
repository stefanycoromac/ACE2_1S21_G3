const oracledb = require('oracledb');
const database = require('../config/database');

const exerciseModel = {
    create: async (parameters) => {
        const query = `INSERT INTO SesionEjercicio(idUsuario, metaPasos, metaCalorias)
            VALUES(:idUsuario, :metaPasos, :metaCalorias)
            RETURNING idSesion INTO :idSesion`;
        let exercise = Object.assign({}, parameters);
        exercise.metaPasos = exercise.metaCalorias * 20;

        exercise.idSesion = {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        };

        const result = await database(query, exercise);

        exercise.idSesion = result.outBinds.idSesion[0];
        return {
            exercise,
            result
        };
    },
    update: async (parameters) => {
        const query = `UPDATE SesionEjercicio SET noPasos = :noPasos,
                caloriasQuemadas = :caloriasQuemadas
            WHERE idSesion = :idSesion`;
        let test = Object.assign({}, parameters);
        test.caloriasQuemadas = test.noPasos / 20;

        const result = await database(query, test);
        if (result.rowsAffected && result.rowsAffected === 1) {
            return {
                result,
                test
            };
        }
        return null;
    },
    updateStatus: async (parameters) => {
        const query = `UPDATE SesionEjercicio SET estado = :estado
            WHERE idSesion = :idSesion`;
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
    getLast: async (parameters) => {
        const query = `SELECT * FROM SesionEjercicio 
            WHERE idUsuario = :idUsuario
            ORDER BY fechaInicio DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getTop: async (parameters) => {
        let query = `SELECT * FROM SesionEjercicio
            WHERE idUsuario = :idUsuario
            ORDER BY idSesion DESC
            FETCH NEXT 5 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    },
    getPerWeek: async (parameters) => {
        let query = `SELECT DISTINCT a.Semana,
            MAX(a.noPasos) OVER (PARTITION BY a.Semana) AS Maximo,
            MIN(a.noPasos) OVER (PARTITION BY a.Semana)  AS minimo,
            ROUND(AVG(a.noPasos) OVER (PARTITION BY a.Semana), 2) AS Promedio 
            FROM 
            (
                SELECT se.idSesion, TO_CHAR(se.fechaInicio, 'iw') AS Semana , se.fechaInicio,
                    se.estado, se.noPasos
                FROM SesionEjercicio se
                WHERE se.idUsuario = :idUsuario
                ORDER BY TO_CHAR(se.fechaInicio, 'iw') 
            ) a
            ORDER BY a.Semana ASC`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows
    }
};

module.exports = exerciseModel;