const mysql = require('mysql2/promise');
const { host, user, password, database } = require('./constants');

const dbConnection = async () => {
    const connection = await mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
    });

    return connection;
}

module.exports = { dbConnection };
