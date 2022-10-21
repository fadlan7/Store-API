const { TransactionHistory, Product, User, Category } = require('../models');
const currencyFormat = require('../helpers/currencyFormat');

class TransactionController {
  static async createTransaction(req, res) {
    const { ProductId, quantity } = req.body;
    const UserId = +res.locals.user.id;

    try {
      const findProduct = await Product.findOne({ where: { id: ProductId } });
      const findUser = await User.findOne({ where: { id: UserId } });

      const total_price = findProduct.price * quantity;
      console.log(total_price);

      if (findProduct === null) {
        return res
          .status(404)
          .json({ message: `Product with id ${ProductId} not found` });
      } else if (quantity > findProduct.stock) {
        return res.status(404).json({
          message: `Stock produk tidak tersedia, hanya tersedia sebanyak ${findProduct.stock} produk`,
        });
      } else if (findUser.balance < total_price) {
        return res.status(404).json({
          message: `Balance anda tidak mencukupi untuk membayar total harga produk sebesar = ${currencyFormat(
            total_price
          )} `,
        });
      }

      const sisaproduct = (findProduct.stock = findProduct.stock - quantity);
      //   findProduct.save();

      const data = { stock: sisaproduct };
      Product.update(data, {
        where: {
          id: findProduct.id,
        },
      });
      //   findUser.balance = findUser.balance - total_price;
      //   findUser.save();

      const transactionData = {
        total_price: currencyFormat(total_price),
        quantity: +quantity,
        product_name: findProduct.title,
      };

      return res.status(201).json({
        message: 'You have successfully purchase the product',
        transactionBill: transactionData,
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
}

module.exports = TransactionController;
