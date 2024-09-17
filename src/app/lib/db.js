// lib/db.js
import mysql from 'mysql2/promise'; // Use promise-based API

console.log('DB Host:', process.env.DB_HOST);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('DB Name:', process.env.DB_NAME);

const credentials = {
  host: process.env.DB_HOST, // Use environment variables for sensitive information
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Number of connections in the pool
  queueLimit: 0, // Unlimited connection queue
}
// Create a connection pool
const pool = mysql.createPool(credentials);
// console.log('DB CREDS:', credentials)

export default pool;