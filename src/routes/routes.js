const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller');
const errorHandler = require('../middleware/errorHandler');

// Welcome message route
router.get('/', controller.getWelcomeMessage);

// Register
router.post('/register', controller.register)

// Login
router.post('/login', controller.login)

// data
router.get('/api/users', controller.getData);
router.post('/api/users', controller.createData);

// posts
router.get('/api/posts', controller.getPosts);
router.post('/api/posts',  controller.createPost);
router.put('/api/posts/:id', controller.updatePost); // only admin can update posts
router.delete('/api/posts/:id', controller.deletePost); // only admin can delete posts

// Add the error handling middleware
router.use(errorHandler);

module.exports = router;