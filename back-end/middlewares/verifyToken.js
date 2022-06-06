const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Access Authorization from req header
  const Authorization = req.header("Authorization");

  if (!Authorization) {
    // Error: unauthorized
    const err = new Error("unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  // Get token
  const token = Authorization.replace("Bearer ", "");

  // Verify token
  const { userId } = jwt.verify(token, process.env.APP_SECRET);

  // Assign red
  req.user = { userId };
  next();
};
