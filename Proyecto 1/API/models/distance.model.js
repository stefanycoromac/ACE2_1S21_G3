const database = require('../config/database');

const distanceModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Distancia(idRepeticion, medicion)
            VALUES(:idRepeticion, :medicion)`;
        const distance = Object.assign({}, parameters);

        const result = await database(query, distance);
        return {
            distance,
            result
        }
    },
    getLast: async (parameters) => {
        const query = `SELECT dist.medicion FROM Distancia dist
            INNER JOIN Repeticion repe ON (dist.idRepeticion = repe.idRepeticion)
            INNER JOIN Test tst ON (repe.idTest = tst.idTest)
            WHERE tst.idUsuario = :idUsuario
            ORDER BY dist.idDistancia DESC
            FETCH NEXT 1 ROWS ONLY`;

        const binds = {
            idUsuario: parameters.idUsuario
        };

        const result = await database(query, binds);
        return result.rows;
    }
};

module.exports = distanceModel;