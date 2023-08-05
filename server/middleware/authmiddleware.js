const jwt = require("jsonwebtoken");
const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "no authorization : invalid token " });
    }
    const decodedtoken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedtoken) {
      return res.json({ message: "no authorization : invalid token" });
    }
    const user = decodedtoken.user;
    if (!user) {
      return res.json({ message: "no authorization : invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = authmiddleware;
