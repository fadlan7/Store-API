'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category);

      this.hasMany(models.TransactionHistory);
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Title name is required' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Price is required' },
          isInt: { args: true, msg: 'Is not a integer on price' },
          len: {
            args: [0, 50000000],
            msg: 'Only allow value for price between 0 and 50000000',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Price is required' },
          isInt: { args: true, msg: 'Is not a integer on price' },
          min: {
            args: [5],
            msg: 'Minimum 5 stocks required in stock',
          },
        },
      },
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
