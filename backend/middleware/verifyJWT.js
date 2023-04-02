const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please login to continue" });
  }

  const token = authHeader.split(" ")[1];
  console.log("authHeader:", authHeader);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decoded.userId,
      username: decoded.username,
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = verifyJWT;
