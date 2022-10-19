const { User } = require('../models');

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

      res.status(201).json({ user: userData });
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
