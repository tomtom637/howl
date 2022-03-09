const jwt = require('jsonwebtoken');

module.exports = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { userId, userRole } = decodedToken;
  return { userId, userRole };
};