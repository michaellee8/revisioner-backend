var firebaseAdmin = require("firebase-admin");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("./serviceAccountKey.json")),
  databaseURL: "https://revisioner-3c321.firebaseio.com"
});
module.exports = function firebaseAuth(
  req: Express$Request,
  res: Express$Response,
  next
) {
  if (req.query.userFirebaseId && req.query.userFirebaseToken) {
    firebaseAdmin
      .auth()
      .verifyIdToken(req.query.userFirebaseToken)
      .then(decodedToken => {
        if (decodedToken.uid === req.query.userFirebaseId) {
          req.userFirebaseId = decodedToken.uid;
          next();
        } else {
          res.status(400).send('{ error : "Invalid auth data" }');
        }
      })
      .else(err => {
        console.log(err);
        res.status(400).send('{ error : "Invalid auth data" }');
      });
  } else {
    req.userFirebaseId = null;
    next();
  }
};
