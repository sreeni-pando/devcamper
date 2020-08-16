
const errorResponse = require('../utils/error-response');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if(err.name === 'CastError'){
        error = new errorResponse(`Resource not found ${err.value}`, 404);
    }
    console.log('in error'.red);
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error',
    });
}

module.exports = errorHandler;