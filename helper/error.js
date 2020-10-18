//untuk menampilkan error beserta lokasi errornya
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

//untuk menampilkan error
const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}

module.exports = {
    ErrorHandler,
    handleError
}