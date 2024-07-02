const errorHandler = (err, req, res, next) => {
  // Set the status code based on the error type
  let statusCode = err.status || 500;

  // Set the error message based on the error type
  let errorMessage = err.message || "Internal Server Error";

  // Log the error for debugging purposes
  console.error(err);

  // Send the error response
  res.status(statusCode).message({ error: errorMessage });
};

module.exports = errorHandler;
