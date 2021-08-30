const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MariaDB_HOST,
  port: process.env.MariaDB_PORT,
  user: process.env.MariaDB_USER,
  password: process.env.MariaDB_PASS,
  database: process.env.MariaDB_DATABASE,
  dateStrings: 'date'
});

module.exports = db;
