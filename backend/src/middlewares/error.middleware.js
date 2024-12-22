const errorHandler = (error, req, res, next) => {
  console.log("inside error handler middleware");
  // Log the error details
  console.error(`[Error]: ${error.message}`, {
    stack: error.stack,
    route: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";
  const response = {
    success: false,
    message: message,
    data: {},
  };

  res.status(statusCode).send(response);
};

export default errorHandler;
