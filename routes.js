const express = require("express");
const router = express.Router();
const controller = require('./controller');
const errorHandler = require('./errorHandler');

// Welcome message route
router.get('/', controller.getWelcomeMessage);

// data

router.get('/api/users', controller.getData);
router.post('/api/users', controller.createData);

// posts
router.get('/api/posts', controller.getPosts);
router.post('/api/posts', controller.createPost);
router.put('/api/posts/:id', controller.updatePost);
router.delete('/api/posts/:id', controller.deletePost);

// Add the error handling middleware
router.use(errorHandler);

module.exports = router;