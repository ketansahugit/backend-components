const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // log in the console
    new winston.transports.File({ filename: 'log.log' }), // log file output
  ],
});

const requestLogger = (req, res, next) => {
  /* console.log(`Received ${req.method} request for ${req.url}`); */
    // Log the request using winston
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
