var db = require("db/projectDb");

module.exports = function(req, res, next) {
  if (!req.userFirebaseId) {
    res.status(404).send({ error: "no such user" });
  } else {
    db.query(
      `
      DELETE FROM revisioner.userTags
      INNER JOIN revisioner.users
      ON revisioner.users.userId = revisioner.userTags.userId
      WHERE revisioner.userTags.userTagId = ? AND revisioner.users.userFirebaseAuthId = ?
      `,
      [req.params.userTagId, req.userFirebaseId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: "Internal server error" });
        } else {
          res.send({ deleted: true });
        }
      }
    );
  }
};
