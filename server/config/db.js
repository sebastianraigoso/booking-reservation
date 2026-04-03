import mysql from 'mysql2'; // load mysql2 library
import dotenv from 'dotenv';

dotenv.config(); // read the .env file

const db = mysql.createConnection({ // how to connect Node to MySQL
  host: process.env.DB_HOST, // where SQL runs (localhost)
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME // which DB to use
});

db.connect((err) => { // open the connection
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('MySQL connected');
  }
});

export default db; // usable on other files