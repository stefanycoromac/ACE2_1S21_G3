const oracledb = require('oracledb');
const database = require('../config/database');

const volumeModel = {
    createInhaled: async (parameters) => {
        const query = `INSERT INTO Inhalado(medicion, minuto, idVO2MAX)
            VALUES(:medicion, :minuto, :idVO2MAX)`;
        const volume = Object.assign({}, parameters);

        const result = await database(query, volume);

        return {
            volume,
            result
        };
    },
    createExhaled: async (parameters) => {
        const query = `INSERT INTO Exhalado(medicion, minuto, idVO2MAX)
            VALUES(:medicion, :minuto, :idVO2MAX)`;
        const volume = Object.assign({}, parameters);

        const result = await database(query, volume);

        return {
            volume,
            result
        };
    },

    createInhaledRE: async (parameters) => {
        const query = `INSERT INTO InhaladoRE(medicion, idVO2MAX)
            VALUES(:medicion, :idVO2MAX)`;
        const volume = Object.assign({}, parameters);

        const result = await database(query, volume);

        return {
            volume,
            result
        };
    },
    createExhaledRE: async (parameters) => {
        const query = `INSERT INTO ExhaladoRE(medicion, idVO2MAX)
            VALUES(:medicion, :idVO2MAX)`;
        const volume = Object.assign({}, parameters);

        const result = await database(query, volume);

        return {
            volume,
            result
        };
    }
};

module.exports = volumeModel;