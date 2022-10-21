const { Product, Category } = require('../models');
const currencyFormat = require('../helpers/currencyFormat');

class ProductController {
  static async createProduct(req, res) {
    const { title, price, stock, CategoryId } = req.body;

    await Category.findOne({ where: { id: CategoryId } })
      .then((category) => {
        if (!category) {
          return res
            .status(404)
            .json({ msg: `Category with id ${CategoryId} not found` });
        }
        Product.create({ title, price, stock, CategoryId })
          .then((productData) => {
            const dataDisplay = {
              id: productData.id,
              title,
              price: currencyFormat(price),
              stock: +stock,
              CategoryId: +CategoryId,
              updatedAt: productData.updatedAt,
              createdAt: productData.createdAt,
            };

            res.status(201).json({
              product: dataDisplay,
            });
          })
          .catch((error) => {
            if (
              error.name === 'SequelizeValidationError' ||
              error.name === 'SequelizeUniqueConstraintError'
            ) {
              return res.status(400).json({
                message: error.errors.map((e) => e.message),
              });
            }

            return res.status(500).json({ message: error.message });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  }

  static async getAllProduct(req, res) {
    try {
      const productDatas = await Product.findAll({
        order: [['id', 'ASC']],
      });

      return res.status(200).json({ products: productDatas });
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

module.exports = ProductController;
