const oracledb = require('oracledb');
const database = require('../config/database');

const volumeModel = {
    create: async (parameters) => {
        const query = `INSERT INTO Volumen(inhalado, exhalado
                minuto, idPrueba)
            VALUES(:inhalado, :exhalado, :minuto, :idPrueba)`;
        const volume = Object.assign({}, parameters);

        const result = await database(query, volume);

        return {
            volume,
            result
        };
    }
};

module.exports = volumeModel;