const router = require('express').Router();
const { UserController, CategoryController } = require('../controllers');
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

module.exports = router;
