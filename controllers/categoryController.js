const { Category } = require('../models');

class CategoryController {
  static async createCategory(req, res) {
    const { type } = req.body;

    try {
      const categoryData = await Category.create({
        type,
      });

      const dataDisplay = {
        id: categoryData.id,
        type,
        updatedAt: categoryData.updatedAt,
        createdAt: categoryData.createdAt,
        sold_product_amount: categoryData.sold_product_amount,
      };

      return res.status(201).json({ category: dataDisplay });
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

module.exports = CategoryController;
