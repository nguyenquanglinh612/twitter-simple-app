const jwt = require("jsonwebtoken");

exports.checkCurrentUsers = (req, res, next) => {
  // Access Authorization from req header
  const Authorization = req.header("Authorization");

  if (!Authorization) {
    req.user = null;
    next();
  } else {
    // Get token
    const token = Authorization.replace("Bearer ", "");

    try {
      // Verify token
      const { userId } = jwt.verify(token, process.env.APP_SECRET);

      // Assign red
      req.user = { userId };
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};
