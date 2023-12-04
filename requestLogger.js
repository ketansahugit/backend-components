const requestLogger = (req, res, next) => {
    // Do something with the request or response
    console.log(`Received ${req.method} request for ${req.url}`);

    // Call the next middleware function in the stack
    next();
}

exports.requestLogger = requestLogger;
