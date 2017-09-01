var db: mysql$Connection = require("projectDb");

module.exports = function(req: express$Request, res: express$Response) {
  if (!req.params.userId) {
    res.status(400).send({ error: "Missing userId" });
  } else {
    db.query(
      `
    SELECT userId, userName, userPhotoUrl, userLastInteractionTimestamp, userCreateTimestamp
    FROM revisioner.users
    WHERE userId = ?
    `,
      [req.params.userId],
      (error, results, fields): mysql$QueryCallback => {
        if (error) {
          console.log(error);
          res
            .status(500)
            .send({ error: "Database query error, please try again later" });
        } else if (results.length < 1) {
          res.status(404).send({ error: "User not found" });
        } else {
          res.send(results[0]);
        }
      }
    );
  }
};
