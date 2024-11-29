require('dotenv').config()
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token

    // Add the decoded user to the request so that it can be used in your routes
    req.user = decoded;
    next();
  });
}

function requireUser(req, res, next) {
  // Check if the role from req.user is 'admin'
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Users only." });
  }
}

function requireAdmin(req, res, next) {
  // Check if the role from req.user is 'admin'
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}


module.exports = {
    authToken,
    requireUser,
    requireAdmin
};