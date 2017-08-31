var db = require("../../../db");
module.exports = function(req: express$Request, res: express$Response) {
  if (!req.userFirebaseId) {
    res.status(500).send({ error: "Not logged in" });
  } else {
    var obj = {};
    ["userName", "userPhotoUrl", "userIntro"].forEach(field => {
      if (req.body[field] && typeof req.body[field] === "string") {
        obj[field] = req.body[field];
      }
    });
    if (columns.length <= 0) {
      res.status(400).send({
        error: "Nothing is going to be modified, did you change anything?"
      });
    } else {
      db.query(
        "UPDATE users SET ? WHERE userFirebaseId = ?",
        [obj, req.userFirebaseId],
        (error, results, fields): mysql$QueryCallback => {
          if (error) {
            console.log(error);
            res.status(500).send({ error: "Internal server error" });
          } else if (result.affectedRows === 0) {
            res.status(404).send({
              error: "Nothing has been modified, did you change anything?"
            });
          } else {
            res.send({ udpated: true });
          }
        }
      );
    }
  }
};
