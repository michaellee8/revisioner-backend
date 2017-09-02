var db = require("db/projectDb");

module.exports = function(req, res, next) {
  if (!req.userFirebaseId) {
    res.send(null);
  } else {
    db.query(
      `
      SELECT userId, userName, userPhotoUrl, userIntro
      FROM revisioner.users INNER JOIN revisioner.userTags
      ON revisioner.users.userId = revisioner.userTags.userId
      WHERE revisioner.userTags.userTagContent = ?
      `,
      [req.query.userTagContent],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: "Internal server error" });
        } else {
          res.send(results);
        }
      }
    );
  }
};
