const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json("You are not authenticated!")
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err){
        return res.json("Token is not valid!")
    }
    req.user = user;
    next()
  });
};
module.exports = verifyToken