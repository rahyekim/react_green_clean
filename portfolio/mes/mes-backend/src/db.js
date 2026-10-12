const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_SERVICE_NAME ||'XE', 
    process.env.DB_USER || 'MES_USR',
    process.env.DB_PASSWORD || '1234',
    {
        host: 'localhost',
        port: 1521,
        dialect: 'oracle',
        logging: false, // 쿼리 로그를 보려면 true로 변경
        dialectOptions: {
            connectString: process.env.DB_CONNECTION_STRING ||'localhost:1521/XE' //
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;