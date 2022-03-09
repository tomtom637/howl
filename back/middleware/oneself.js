const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    if(parseInt(userId) !== parseInt(req.params.userId)) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch(error) {
    res.status(401).json({ error: error });
  }
};