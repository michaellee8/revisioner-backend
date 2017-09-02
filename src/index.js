require("app-module-path").addPath(__dirname);
var db = require("db/projectDb");
var app = require("./app");
const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
