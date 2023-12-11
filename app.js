const express = require("express");
const routes = require("./routes");
const connectDB = require('./db');
const model = require('./model')
const corsMiddleware = require('./corsMiddleware');
const errorHandler = require('./errorHandler');
require('dotenv').config();
const { requestLogger } = require('./requestLogger');
const helmet = require('helmet'); //security middleware
const rateLimit = require('express-rate-limit'); //rate limiter
const limiter = require('./limiter');
const winston = require('winston');

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

app.listen(port, () => {
    console.log(`Server is listening at localhost: ${port}`)
});
