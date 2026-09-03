import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();
// dotenv.config({path: path.join(__dirname, '/../../.env')});

export const AppDatasource = new DataSource({
    type: 'oracle',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 1521,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_SERVICE_NAME || 'FREEPDB1',
    synchronize: false,  //처음에만 한번 켜두고 false해두기
    logging: true,
    entities: [__dirname + '/../entities/**/*.{js,ts}'],
    extra: {
        poolMin:2,
        poolMax:10,
        poolIncrement:1,
    }
});