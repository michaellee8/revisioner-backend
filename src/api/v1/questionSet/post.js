var db = require("db/projectDb");

module.exports = function(req, res) {
  if (!req.userFirebaseId) {
    res.status(403).send({ error: "Not loged in" });
  } else {
  }
};
