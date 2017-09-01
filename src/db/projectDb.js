require("app-module-path").addPath(__dirname);
var mysql: mysql = require("mysql");
// To connect: mysql -u root -p
var connection: mysql$Connection = mysql.createConnection(
  ({
    host: "localhost",
    user: "app",
    password: "revisioner",
    database: "revisioner"
  }: mysql$ConnectionOptions)
);
connection.connect((err: Error) => console.log(err));

module.exports = connection;
