var db = require("src/projectDb");

module.exports = function(req, res) {
  db.query(
    `
    SELECT
      revisioner.questionSets.questionSetId as questionSetId,
      revisioner.questionSets.userId as userId,
      revisioner.questionSets.questionSetTitle as questionSetTitle,
      revisioner.questionSets.questionSetIntro as questionSetIntro,
      revisioner.questionSets.questionSetSubject as questionSetSubject,
      revisioner.questionSets.questionSetLastUpdateTimestamp as questionSetLastUpdateTimestamp,
      revisioner.users.userPhotoUrl as userPhotoUrl,
      revisioner.users.userName as userName
    FROM revisioner.questionSets
    INNER JOIN revisioner.users
    ON revisioner.questionSets.userId = revisioner.users.userId
    ORDER BY questionSetLastUpdateTimestamp
    LIMIT 30
    `,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send({ error: "Internal server error, please try again later" });
      } else {
        res.send(results);
      }
    }
  );
};
