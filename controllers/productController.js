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

  static async editProduct(req, res) {
    const id = +req.params.productId;
    const { title, price, stock } = req.body;
    const datas = { title, price, stock };

    try {
      const findProduct = await Product.findOne({
        where: {
          id: id,
        },
      });

      if (!findProduct) {
        return res
          .status(404)
          .json({ message: `Product with id ${id} not found` });
      } else {
        const productData = await Product.update(datas, {
          where: { id },
          returning: true,
        });

        const dataDisplay = {
          id,
          title,
          price: currencyFormat(price),
          stock: +stock,
          CategoryId: productData[1][0].CategoryId,
          updatedAt: productData[1][0].updatedAt,
          createdAt: productData[1][0].createdAt,
        };

        return res.status(200).json({
          product: dataDisplay,
        });
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

  static async editCategoryId(req, res) {
    const id = +req.params.productId;
    const CategoryId = +req.body.CategoryId;

    try {
      const findProduct = await Product.findAll({ where: { id } });
      const categoryData = await Category.findAll({
        where: { id: CategoryId },
      });

      if (findProduct.length === 0) {
        return res
          .status(404)
          .json({ message: `Product with id ${id} not found` });
      } else if (categoryData.length === 0) {
        return res
          .status(404)
          .json({ message: `Category with id ${CategoryId} not found` });
      } else {
        const data = { CategoryId: CategoryId };
        const productData = await Product.update(data, {
          where: {
            id,
          },
          returning: true,
        });

        const dataDisplay = {
          id,
          title: productData[1][0].title,
          price: currencyFormat(productData[1][0].price),
          stock: +productData[1][0].stock,
          CategoryId,
          updatedAt: productData[1][0].updatedAt,
          createdAt: productData[1][0].createdAt,
        };

        return res.status(200).json({
          product: dataDisplay,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    const id = +req.params.productId;

    try {
      const findProduct = await Product.findOne({ where: { id } });

      if (findProduct === null) {
        return res
          .status(404)
          .json({ message: `Product with id ${id} not found` });
      } else {
        await Product.destroy({ where: { id } });

        return res
          .status(200)
          .json({ message: 'Product has been successfully deleted' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProductController;
