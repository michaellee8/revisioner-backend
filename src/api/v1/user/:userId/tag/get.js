var db = require("db/projectDb");

module.exports = function(req, res, next) {
  db.query(
    `
    SELECT userTagId, userId, userTagContent
    FROM revisioner.userTags
    WHERE userId = ?
  `,
    [req.params.userId],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
      } else {
        res.send(results);
      }
    }
  );
};
