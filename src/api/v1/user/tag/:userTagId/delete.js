var db: mysql$Connection = require("projectDb");

module.exports = function(req: express$Request, res: express$Response) {
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
      (error, results, fields): mysql$QueryCallback => {
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
