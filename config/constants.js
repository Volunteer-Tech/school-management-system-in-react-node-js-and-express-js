const dotEnv = require('dotenv');

dotEnv.config();

const config = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

module.exports = config;
