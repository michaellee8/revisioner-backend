var db: mysql$Connection = require("projectDb");

module.exports = function(req: express$Request, res: express$Response) {
  if (!req.query.targetserId) {
    res.status(400).send({ error: "Missing parameter targetUserId" });
  } else {
    db.query(
      `
    SELECT COUNT(*) AS userReactionCount, userReactionType, targetUserId
    FROM revisioner.userReactions
    WHERE targetUserId = ?
    GROUP BY userReactionType
    ORDER BY COUNT(*) DESC
  `,
      [req.query.targetUserId],
      (error, results, fields): mysql$QueryCallback => {
        if (error) {
          console.log(error);
          res
            .status(500)
            .send({ error: "Database query error, please try again later" });
        } else {
          res.send(results);
        }
      }
    );
  }
};
