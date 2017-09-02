var db = require("db/projectDb");

module.exports = function(req, res, next) {
  if (!req.userFirebaseId) {
    res.send(null);
  } else {
    db.query(
      "SELECT userId, userName, userPhotoUrl, userIntro FROM revisioner.users WHERE revisioner.users.userFirebaseAuthId = ?",
      [req.userFirebaseId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: "Internal server error" });
        } else if (results.length === 0) {
          res.status(404).send({ error: "No such user" });
        } else if (results.length > 1) {
          console.log(
            new Error(
              "More than one user exists with this firebase auth id " +
                req.userFirebaseId
            )
          );
          res.status(500).send({
            error:
              "More than one user exists with this firebase auth id, please contact developer"
          });
        } else {
          res.send(results[0]);
        }
      }
    );
  }
};
