let mysql = require("mysql");

let database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wowwjd123",
  database: "coscuz"
});
database.connect();

module.exports = database;
