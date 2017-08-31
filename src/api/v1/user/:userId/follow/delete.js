var db: mysql$Connection = require("../../../../../db");

module.exports = function(req: express$Request, res: express$Response) {
  if (!req.userFirebaseId) {
    res.status(400).send({ error: "Not logined" });
  } else {
    db.query(
      "SELECT userId FROM revisioner.users WHERE userFirebaseAuthId = ? LIMIT 1",
      [req.userFirebaseId],
      (error, results, fields): mysql$QueryCallback => {
        if (error) {
          console.log(error);
          res.status(500).send("Server internal error, please try again later");
        } else if (results.length < 1) {
          res
            .status(400)
            .send("Cannot find your user data, please try again later");
        } else {
          db.query(`
            DELETE FROM revisioner.user
            WHERE
          `);
        }
      }
    );
  }
};
