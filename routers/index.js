const router = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const { authorizationUser } = require('../middlewares/authorization');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.use(authentication);

router.put('/users/:userId', authorizationUser, UserController.updateUser);
router.delete('/users/:userId', authorizationUser, UserController.deleteUser);
router.patch('/users/topup', UserController.updateBalance);

module.exports = router;
