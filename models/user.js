'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.TransactionHistory);
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Full name is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'This email has been used, try another one',
        },
        validate: {
          isEmail: { args: true, msg: 'Invalid email address' },
          notEmpty: { args: true, msg: 'Email is required' },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Password is required' },
          len: {
            args: [6, 10],
            msg: 'Only allow between 6 and 10 character for password',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Gender is required' },
          isIn: { args: [['male', 'female']], msg: 'Must be male or female' },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Role is required' },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Balance is required' },
          isInt: { args: true, msg: 'Is not a integer on balance' },
          len: {
            args: [0, 100000000],
            msg: 'Only allow value for balance between 0 and 100000000',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, opt) => {
          user.balance = 0;

          const hashedPassword = hashPassword(user.password);
          user.password = hashedPassword;
        },
      },
    }
  );
  return User;
};
