// Middleware to handle not found urls
const notFound = (req, res, next) => {
    const allowedMethods = ['POST', 'GET'];
  
    if (!allowedMethods.includes(req.method)) {
        const error = new Error('Method Not Allowed');
        error.status = 405; // HTTP status code for Method Not Allowed
        next(error);
    } else{ 
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status(404);
        next(error);
    }        
}

// Middleware to handle errors in code
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    
    res.status(statusCode).json({
        message: err.message,
        status: err.status,
        stackHighlighted: process.env.NODE_ENV === 'production' ? null : err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    });
}

export { notFound, errorHandler };