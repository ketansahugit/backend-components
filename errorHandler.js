const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Customize the response based on the error
    res.status(500).json({ error: 'Something went wrong!'});
};

module.exports = errorHandler;