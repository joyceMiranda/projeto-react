import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


// Carrega variáveis do .env
dotenv.config();

/*
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
*/

const connection = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default connection;