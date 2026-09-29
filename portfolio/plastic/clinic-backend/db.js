
require("dotenv").config();
require("reflect-metadata");

const FooterSettings = require('./src/entity/FooterSettings');
const {DataSource}= require('typeorm');
const Member = require("./src/entity/Member");
const { poolMin, poolMax, poolIncrement } = require("oracledb");
const Consult = require("./src/entity/Consult");
const NavSettings = require("./src/entity/NavSettings");
const Carousel = require("./src/entity/Carousel");

const AppDataSource = new DataSource({
    type: "oracle",
    host: "localhost",
    port: 1521,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
    database: "XEPDB1",
    synchronize:false,  
    //한번만해놓고 생성되면 sync false로 해놓기
    //로깅최적화(운영환경이 아닐때만 true)
    logging: process.env.NODE_ENV !== 'production',
    entities: [Member, FooterSettings, Consult, NavSettings, Carousel],
    extra:{
        poolMin:2, poolMax:10, poolIncrement:1,
    }
})

module.exports = AppDataSource;