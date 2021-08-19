const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "jaeki8840",
  database: "today_i_learned",
});

module.exports = db;
