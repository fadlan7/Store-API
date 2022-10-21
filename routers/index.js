const router = require('express').Router();
const {
  UserController,
  CategoryController,
  ProductController,
} = require('../controllers');
const authentication = require('../middlewares/authentication');
const {
  authorizationUser,
  authorizationAdmin,
} = require('../middlewares/authorization');

//User ----------------------------------------------------------
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.use(authentication);

router.put('/users/:userId', authorizationUser, UserController.updateUser);
router.delete('/users/:userId', authorizationUser, UserController.deleteUser);
router.patch('/users/topup', UserController.updateBalance);

//Category -------------------------------------------------------
router.post(
  '/categories',
  authorizationAdmin,
  CategoryController.createCategory
);
router.get(
  '/categories',
  authorizationAdmin,
  CategoryController.getAllCategories
);
router.patch(
  '/categories/:categoryId',
  authorizationAdmin,
  CategoryController.editCategory
);
router.delete(
  '/categories/:categoryId',
  authorizationAdmin,
  CategoryController.deleteCategory
);

//Product -------------------------------------------------------
router.post('/products', authorizationAdmin, ProductController.createProduct);
router.get('/products', authorizationAdmin, ProductController.getAllProduct);
router.put(
  '/products/:productId',
  authorizationAdmin,
  ProductController.editProduct
);
router.patch(
  '/products/:productId',
  authorizationAdmin,
  ProductController.editCategoryId
);

module.exports = router;
