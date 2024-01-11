const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller');
const errorHandler = require('../middleware/errorHandler');
const { authenticateJwt, authorizeRole } = require('../middleware/authMiddleware');

// Welcome message route
router.get('/', controller.getWelcomeMessage);

// Registration route
router.post('/api/register', controller.registerUser);

// Login route
router.post('/api/login', controller.loginUser);


// data
router.get('/api/users', authenticateJwt, controller.getData);
router.post('/api/users', authenticateJwt, controller.createData);

// posts
router.get('/api/posts', authenticateJwt, controller.getPosts);
router.post('/api/posts', authenticateJwt, controller.createPost);
router.put('/api/posts/:id', authenticateJwt, authorizeRole('admin'), controller.updatePost); // only admin can update posts
router.delete('/api/posts/:id', authenticateJwt, authorizeRole('admin'), controller.deletePost); // only admin can delete posts

// Add the error handling middleware
router.use(errorHandler);

module.exports = router;