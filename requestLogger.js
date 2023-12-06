const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log.log' }),
  ],
});

const requestLogger = (req, res, next) => {
    // Log the request using winston
    /* console.log(`Received ${req.method} request for ${req.url}`); */
    logger.info({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    });

    // Call the next middleware function in the stack
    next();
}

exports.requestLogger = requestLogger;
