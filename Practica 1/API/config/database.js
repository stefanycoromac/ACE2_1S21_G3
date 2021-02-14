const oracledb = require('oracledb');

const parameters = {
    user: 'healthDB',
    password: '1234',
    connectString: '172.17.0.2:1521/ORCL18'
};

const oracleDBConnection = async (statement, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let connection;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;

        try {
            connection = await oracledb.getConnection(parameters);

            const result = await connection.execute(statement, binds, opts);

            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
};

module.exports = oracleDBConnection;