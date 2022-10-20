const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const token = req.get('token');
    const userDecoded = verifyToken(token);

    await User.findOne({
      where: {
        id: userDecoded.id,
      },
    })
      .then((userData) => {
        if (!userData) {
          return res.status(401).json({
            message: `User with email ${userDecoded.email} not found in database`,
          });
        }
        res.locals.user = userData;
        return next();
      })
      .catch((error) => {
        res.status(401).json({ message: error.message });
      });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authentication;
