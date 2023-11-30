const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.get('/one', controller.getData);
router.post('/two', controller.createData);

module.exports = router;