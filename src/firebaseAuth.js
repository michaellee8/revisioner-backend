var firebaseAdmin = require("firebase-admin");
var db = require("db/projectDb");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    require("./serviceAccountKey.json")
  ),
  databaseURL: "https://revisioner-3c321.firebaseio.com"
});
module.exports = function firebaseAuth(req, res, next) {
  if (req.query.userFirebaseId && req.query.userFirebaseToken) {
    firebaseAdmin
      .auth()
      .verifyIdToken(req.query.userFirebaseToken)
      .then(decodedToken => {
        if (decodedToken.uid === req.query.userFirebaseId) {
          req.userFirebaseId = decodedToken.uid;
          db.query(
            "UPDATE users WHERE userFirebaseId = ?",
            [req.userFirebaseId],
            (error, results, fields) => {
              if (error) {
                console.log(error);
              }
            }
          );
          next();
        } else {
          res.status(400).send('{ error : "Invalid auth data" }');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('{ error : "Invalid auth data" }');
      });
  } else {
    req.userFirebaseId = null;
    next();
  }
};
