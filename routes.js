const express = require("express");
const router = express.Router();
const controller = require('./controller');
const errorHandler = require('./errorHandler');

// Welcome message route
router.get('/', controller.getWelcomeMessage);

router.get('/api/users', controller.getData);
router.post('/api/users', controller.createData);

// Add the error handling middleware
router.use(errorHandler);

module.exports = router;