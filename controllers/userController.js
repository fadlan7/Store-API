const { User } = require('../models');
const currencyFormat = require('../helpers/currencyFormat');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
class UserController {
  static async register(req, res) {
    const { full_name, password, gender, email } = req.body;
    const roleValue = 2;
    try {
      const userData = await User.create({
        full_name,
        password,
        gender,
        email,
        role: roleValue,
      });

      const userBalance = currencyFormat(userData.balance);
      const displayData = {
        id: +userData.id,
        full_name,
        email,
        gender,
        balance: userBalance,
        createdAt: userData.createdAt,
      };

      res.status(201).json({ user: displayData });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        return res.status(400).json({
          message: error.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const userData = await User.findOne({
        where: {
          email,
        },
      });

      if (userData) {
        const isCorrectPassword = comparePassword(password, userData.password);

        if (isCorrectPassword) {
          const token = generateToken({
            id: userData.id,
            email: userData.email,
          });
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Wrong Password' });
        }
      } else {
        res
          .status(401)
          .json({ message: `User with email ${email}  not found` });
      }
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        return res.status(400).json({
          message: error.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const id = +req.params.userId;
    const { email, full_name } = req.body;

    const data = {
      email,
      full_name,
    };

    try {
      const userData = await User.update(data, {
        where: {
          id,
        },
        returning: true,
        raw: true,
      });

      // console.log(userData.createdAt);

      const dataDisplay = {
        id,
        full_name,
        email,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };

      // console.log(userData);
      return res.status(200).json({ user: dataDisplay });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        return res.status(400).json({
          message: error.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const id = +req.params.userId;

    try {
      await User.destroy({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: 'Your account has been successfully deleted' });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        return res.status(400).json({
          message: error.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
