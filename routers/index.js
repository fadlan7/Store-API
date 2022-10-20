const router = require('express').Router();
const { UserController } = require('../controllers');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

module.exports = router;
