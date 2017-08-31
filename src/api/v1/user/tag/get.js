var db = require("../../../db");

module.exports = function(req: express$Request, res: express$Response) {
  if (!req.userFirebaseId) {
    res.send(null);
  } else {
    db.query(
      "SELECT userId, userName, userPhotoUrl, userIntro FROM revisioner.users INNER JOIN revisioner.userTags ON revisioner.users.userId = revisioner.userTags.userId WHERE revisioner.userTags.userTagContent = ?",
      [req.query.userTagContent],
      (error, results, fields): mysql$QueryCallback => {
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
