var mysql = require("mysql");
// To connect: mysql -u root -p
var connection = mysql.createConnection({
  host: "localhost",
  user: "app",
  password: "revisioner",
  database: "revisioner",
  port: 3306
});
connection.connect(err => console.log(err));

module.exports = connection;
