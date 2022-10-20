const { Category, Product } = require('../models');

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

  static async getAllCategories(req, res) {
    try {
      const categoryDatas = await Category.findAll({
        include: [
          {
            model: Product,
          },
        ],
        order: [['id', 'ASC']],
      });
      //   { include: [Comment, User] }
      return res.status(200).json({ categories: categoryDatas });
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

  static async editCategory(req, res) {
    const id = +req.params.categoryId;
    const { type } = req.body;

    console.log(typeof id, id);

    try {
      const categoryData = await Category.findOne({ where: { id } });
      console.log(categoryData);
      categoryData.type = type;

      const dataDisplay = {
        id,
        type,
        sold_product_amount: categoryData.sold_product_amount,
        updatedAt: categoryData.updatedAt,
        createdAt: categoryData.createdAt,
      };
      categoryData.save();

      return res.status(200).json({
        category: dataDisplay,
      });
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

  static async deleteCategory(req, res) {
    const id = +req.params.categoryId;

    try {
      const findCategory = await Category.findOne({
        where: {
          id: id,
        },
      });

      if (!findCategory) {
        return res
          .status(404)
          .json({ message: `Category with id ${id} not found` });
      } else {
        await Category.destroy({
          where: { id },
        });
        return res
          .status(200)
          .json({ message: 'Category has been successfully deleted' });
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
}

module.exports = CategoryController;
