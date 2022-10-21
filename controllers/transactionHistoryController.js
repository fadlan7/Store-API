const { TransactionHistory, Product, User, Category } = require('../models');
const currencyFormat = require('../helpers/currencyFormat');

class TransactionController {
  static async createTransaction(req, res) {
    const ProductId = +req.body.ProductId;
    const quantity = +req.body.quantity;
    const UserId = +res.locals.user.id;

    try {
      const findProduct = await Product.findOne({ where: { id: ProductId } });
      const findUser = await User.findOne({ where: { id: UserId } });
      const findCategory = await Category.findOne({
        where: { id: findProduct.CategoryId },
      });

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
          message: `Balance anda tidak mencukupi untuk membayar total harga produk sebesar ${currencyFormat(
            total_price
          )}. Anda hanya memiliki balance sebesar ${currencyFormat(
            findUser.balance
          )} `,
        });
      }

      findProduct.stock -= quantity;
      findProduct.save();
      findUser.balance -= total_price;
      findUser.save();
      findCategory.sold_product_amount += quantity;
      findCategory.save();

      await TransactionHistory.create({
        ProductId,
        UserId,
        quantity,
        total_price,
      });

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

  static async getAllTransactionUser(req, res) {
    const UserId = +res.locals.user.id;
    console.log(UserId);
    try {
      const transactionDatas = await TransactionHistory.findAll({
        where: { UserId },
        include: [
          {
            model: Product,
            attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
          },
        ],
        order: [['id', 'ASC']],
      });

      return res.status(200).json({ transactionHistories: transactionDatas });
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
