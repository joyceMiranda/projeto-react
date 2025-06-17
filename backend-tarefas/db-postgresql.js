import { configDotenv } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


// Carrega variáveis do .env
configDotenv()

const connection = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 ssl: {
    // Permite conectar sem validar CA (não recomendado para produção)
    rejectUnauthorized: false          
  }
});

export default connection;