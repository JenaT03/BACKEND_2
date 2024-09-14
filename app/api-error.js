class ApiError extends Error {
    constructor(statusCode, message) {
        super(); // contructor lớp cha
        this.statusCode = statusCode;
        this.message = message;
    }

}

module.exports = ApiError;