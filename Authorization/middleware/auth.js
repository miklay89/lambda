const jwt = require("jsonwebtoken");
const keys = require('../keys/keys');

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  if (bearerToken) {
    try {
      jwt.verify(bearerToken, keys.TOKEN_SECRET, (err, data) => {
        if (err) console.log(err);
        req.body.email = data.email;
        return next();
      });
      
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } else {
    res.status(401).send("Unauthorised");
  }
};

module.exports = verifyToken;