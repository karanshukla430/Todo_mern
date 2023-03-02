const express = require('express');

const router = express.Router();

router.use('/users',require('./users'));
router.use('/playlist',require('./playlist'));


module.exports = router;