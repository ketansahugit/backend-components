const express = require("express");
const router = express.Router();
const controller = require('./controller');
const errorHandler = require('./errorHandler');

router.get('/one', controller.getData);
router.post('/two', controller.createData);

// Add the error handling middleware
router.use(errorHandler);

module.exports = router;