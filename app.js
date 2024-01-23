const express = require("express");
const routes = require("./src/routes/routes");
const connectDB = require('./db');
const corsMiddleware = require('./src/middleware/corsMiddleware');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();
const { requestLogger } = require('./src/middleware/requestLogger');
const helmet = require('helmet'); //security middleware
const limiter = require('./src/middleware/limiter');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

// Apply rate limiting middleware
app.use(limiter);

// Use helmet middleware for setting security headers
app.use(helmet());

// Connect to the database
connectDB();

// Use the CORS middleware
app.use(corsMiddleware);

// Use winston for logging requests
 app.use(requestLogger);

// Using the routes in the application
app.use('/', routes);

// Use the error handling middleware
app.use(errorHandler);

module.exports = app.listen(port, () => { // exporting for tests
    console.log(`Server is listening at localhost: ${port}`)
});

