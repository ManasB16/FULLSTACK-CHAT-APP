export class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
  }
  /**
   * Sends a 400 Bad Request response
   * @param {Object} res - Express response object
   * @param {Array|string} [errors=[]] - Errors to be sent in the response
   * @param {string} [message="Bad request"] - Error message
   */
  static badRequest(message = "Bad request") {
    return new ErrorResponse(400, message);
  }

  /**
   * Sends a 401 Unauthorized response
   * @param {Object} res - Express response object
   * @param {string} [message="Unauthorized"] - Error message
   */
  static unauthorized(message = "Unauthorized") {
    return new ErrorResponse(401, message);
  }

  /**
   * Sends a 403 Forbidden response
   * @param {Object} res - Express response object
   * @param {string} [message="Forbidden"] - Error message
   */
  static forbidden(message = "Forbidden") {
    return new ErrorResponse(403, message);
  }

  /**
   * Sends a 404 Not Found response
   * @param {Object} res - Express response object
   * @param {string} [message="Resource not found"] - Error message
   */
  static notFound(message = "Resource not found") {
    return new ErrorResponse(404, message);
  }

  /**
   * Sends a 409 Conflict response
   * @param {Object} res - Express response object
   * @param {string} [message="Conflict"] - Error message
   */
  static conflict(message = "Conflict") {
    return new ErrorResponse(409, message);
  }

  /**
   * Sends a 422 Unprocessable Entity response
   * @param {Object} res - Express response object
   * @param {Array|string} [errors=[]] - Errors to be sent in the response
   * @param {string} [message="Unprocessable entity"] - Error message
   */
  static unprocessableEntity(message = "Unprocessable entity") {
    return new ErrorResponse(422, message);
  }

  /**
   * Sends a 429 Too Many Requests response
   * @param {Object} res - Express response object
   * @param {string} [message="Too many requests"] - Error message
   */
  static tooManyRequests(message = "Too many requests") {
    return new ErrorResponse(429, message);
  }

  /**
   * Sends a 500 Internal Server Error response
   * @param {Object} res - Express response object
   * @param {string} [message="Internal server error"] - Error message
   */
  static internalServerError(message = "Internal server error") {
    return new ErrorResponse(500, message);
  }

  /**
   * Sends a 503 Service Unavailable response
   * @param {Object} res - Express response object
   * @param {string} [message="Service unavailable"] - Error message
   */
  static serviceUnavailable(message = "Service unavailable") {
    return new ErrorResponse(503, message);
  }
}
