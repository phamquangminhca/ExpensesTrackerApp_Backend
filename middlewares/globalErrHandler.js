const globalErrHandler = (err, req, res, next) => {
    //message
    //status
    //statusCode
    //stack
    const statusCode = err.statusCode = err.statusCode || 500;
    const status = err.status = err.status || 'error';
    const message = err.message;
    const stack = err.stack;
    res.status(statusCode).json({
        status,
        message: message,
        stack,
    })
}

module.exports = globalErrHandler;