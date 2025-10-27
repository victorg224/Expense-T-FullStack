import dotenv from "dotenv";
import pg from 'pg';


dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // Explicitly convert to string
  database: process.env.DB_NAME,
});

export const sql = (query,params) => pool.query(query,params);
  

export default pool;