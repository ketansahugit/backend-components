const express = require("express");
const routes = require("./routes");
const connectDB = require('./db');
const Model = require('./model')
const corsMiddleware = require('./corsMiddleware');
const errorHandler = require('./errorHandler');
require('dotenv').config();
const { requestLogger } = require('./requestLogger');
const helmet = require('helmet'); //security middleware
const rateLimit = require('express-rate-limit'); //rate limiter
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000;

/* // Configure Winston to log to console and a file
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(), //this
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logfile.log',
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ],
});
 */

/* const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' }),
    ]
  }); */
  /* 
  logger.info('Hello, Winston!');
  logger.error('Something went wrong', {error: new Error('Something went wrong')}); */
// Middleware to parse JSON in the request body
app.use(express.json());

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 100, // 15 minute
    max: 100,  // limit each IP to 100 requests per windowMs
});

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

// Custom middleware for logger
/* const myMiddleware = (req, res, next) => {
    // Log custom middleware activity
    logger.info('Custom middleware executed');
    next();
}; */

/* app.use(myMiddleware); */

app.listen(port, () => {
    console.log(`Server is listening at localhost: ${port}`)
});