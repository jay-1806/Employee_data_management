const mysql = require('mysql');
require('dotenv').config()

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "root123"
//   database: 'Employee'
});

// Attempt to connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Database connection successful!');
  
  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Database connection closed.');
  });
});