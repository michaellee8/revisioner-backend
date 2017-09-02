var db = require("projectDb");

module.exports = function(req: express$Request, res: express$Response) {
  db.query(
    `
    SELECT userTagId, userId, userTagContent
    FROM revisioner.userTags
    WHERE userId = ?
  `,
    [req.params.userId],
    (error, results, fields): mysql$QueryCallback => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
      } else {
        res.send(results);
      }
    }
  );
};
