const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, userRole } = decodedToken;
    if(req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else if (userRole !== 'admin') {
      throw new Error('Not authorized');
    } else {
      next();
    }
  } catch(error) {
    res.status(401).json({ error });
  }
};