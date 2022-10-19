'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Product);
    }
  }
  TransactionHistory.init(
    {
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Quantity is required' },
          isInt: { args: true, msg: 'Is not a integer on quantity' },
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Total price is required' },
          isInt: { args: true, msg: 'Is not a integer on total price' },
        },
      },
    },
    {
      sequelize,
      modelName: 'TransactionHistory',
    }
  );
  return TransactionHistory;
};
