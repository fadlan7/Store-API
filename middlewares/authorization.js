const { User, TransactionHistory } = require('../models');

async function authorizationUser(req, res, next) {
  const userId = req.params.userId;
  const authenticatedUser = res.locals.user;

  try {
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    if (findUser.id === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        message: `User with email ${authenticatedUser.email} does not have permission to access user with id ${userId} `,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function authorizationAdmin(req, res, next) {
  const authenticatedUser = res.locals.user;

  try {
    if (authenticatedUser.role === 0) {
      return next();
    } else {
      return res.status(403).json({
        message: `User with email ${authenticatedUser.email} does not have permission to access category `,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function authorizationUserTransaction(req, res, next) {
  const transactionId = +req.params.transactionId;
  const authenticatedUser = res.locals.user;

  try {
    const findTransaction = await TransactionHistory.findOne({
      where: {
        id: transactionId,
      },
    });

    if (!findTransaction) {
      return res
        .status(404)
        .json({ message: `Transaction with id ${transactionId} not found` });
    }

    if (findTransaction.UserId === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        message: `User with email ${authenticatedUser.email} does not have permission to access transaction with id ${transactionId} `,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  authorizationUser,
  authorizationAdmin,
  authorizationUserTransaction,
};
