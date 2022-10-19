const router = require('express').Router();

router.get('/', (req, res) => {
  router.send('Hello World');
});

module.exports = router;
