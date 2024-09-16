require('dotenv').config(); // Load environment variables

const mysql = require('mysql2/promise'); // Use promise-based API

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Use environment variables for sensitive information
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Number of connections in the pool
  queueLimit: 0, // Unlimited connection queue
});

// Test the connection
(async () => {
  try {
    console.log('DB Host:', process.env.DB_HOST);
    console.log('DB User:', process.env.DB_USER);
    console.log('DB Password:', process.env.DB_PASSWORD);
    console.log('DB Name:', process.env.DB_NAME);

    const [connection] = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();
