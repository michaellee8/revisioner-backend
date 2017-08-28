var mysql = require("mysql");
// To connect: mysql -u root -p
var connection = mysql.createConnection({
  host: "localhost",
  user: "app",
  password: "revisioner",
  database: "revisioner"
});
connection.connect();

module.exports = connection;
