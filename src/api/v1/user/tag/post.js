var db = require("db/projectDb");

module.exports = function(req, res, next) {
  if (!req.userFirebaseId) {
    res.status(403).send({ error: "Not logged in" });
  } else {
    if (!req.body.userTagContent) {
      res.status(400).send({
        error: "Nothing is going to be modified, missing userTagContent"
      });
    } else {
      db.query(
        "SELECT userId FROM revisioner.users WHERE userFirebaseAuthId = ?",
        [req.userFirebaseId],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            res.status(500).send({ error: "Internal server error" });
          } else if (results.length === 0) {
            res.status(404).send({
              error: "Account does not exists, please try again later"
            });
          } else {
            if (results.length > 1) {
              console.log(
                new Error(req.userFirebaseId + " maps to more than one user")
              );
            }
            db.query(
              `
              INSERT INTO revisioner.userTags (userId, userTagContent)
              SELECT * FROM (SELECT ?, ?) AS tmp
              WHERE NOT EXISTS (
                SELECT userId, userTagContent
                FROM revisioner.userTags
                WHERE userId = ? AND userTagContent = ?
              ) LIMIT 1;
            `,
              [
                results[0].userId,
                req.body.userTagContent,
                results[0].userId,
                req.body.userTagContent
              ],
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                  res.status(500).send({ error: "Internal server error" });
                } else if (result.affectedRows === 0) {
                  res.status(404).send({
                    error: "Nothing has been modified, did you change anything?"
                  });
                } else {
                  res.send({ created: true });
                }
              }
            );
          }
        }
      );
    }
  }
};
