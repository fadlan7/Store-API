const router = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const { authorizationUser } = require('../middlewares/authorization');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.use(authentication);

router.use('/users/:userId', authorizationUser);
router.put('/users/:userId', UserController.updateUser);
// router.delete('/users/:userId', UserController.deleteUser);

module.exports = router;
