class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // setting is operational later for checking whether to send it to the client
    this.isOperational = true;
    // prevent sending error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
