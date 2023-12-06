const winston = require('winston');

const requestLogger = (req, res, next) => {
    // Log the request using winston
    winston.info(`Received ${req.method} request for ${req.url}`, {
        method: req.method,
        url: req.url,
        timestamp: new Date(),
    })

  // Continue with the next middleware
  next();
}

exports.requestLogger = requestLogger;
