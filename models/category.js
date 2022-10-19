'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product);
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Type name is required' },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { args: true, msg: 'Sold product amount is required' },
          isInt: { args: true, msg: 'Is not a integer on sold product amount' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      hooks: {
        beforeCreate: (category, opt) => {
          category.sold_product_amount = 0;
        },
      },
    }
  );
  return Category;
};
