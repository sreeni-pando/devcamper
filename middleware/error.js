
const errorResponse = require('../utils/error-response');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.log(err);
    if(err.name === 'CastError'){
        error = new errorResponse(`Resource not found ${err.value}`, 404);
    }
    if(err.code === 11000){
        const message = 'Duplicate value entered';
        error = new errorResponse(message, 400);
    }
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(_val => _val.message);
        error = new errorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error',
    });
}

module.exports = errorHandler;