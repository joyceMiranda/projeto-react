import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega variáveis do .env
dotenv.config();

console.log('USER:', process.env.DB_USER);


const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default connection;