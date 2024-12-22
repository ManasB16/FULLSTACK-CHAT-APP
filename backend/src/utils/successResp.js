export class SuccessResponse {
  /**
   * Sends a 200 OK response
   * @param {Object} res - Express response object
   * @param {Object} [data={}] - Data to be sent in the response
   * @param {string} [message="Success"] - Success message
   */
  static ok(res, message = "Success", data = {}) {
    return res.status(200).json({ success: true, message, data });
  }

  /**
   * Sends a 201 Created response
   * @param {Object} res - Express response object
   * @param {Object} [data={}] - Data to be sent in the response
   * @param {string} [message="Resource created successfully"] - Success message
   */
  static created(res, message = "Resource created successfully", data = {}) {
    return res.status(201).json({ success: true, message, data });
  }

  /**
   * Sends a 202 Accepted response
   * @param {Object} res - Express response object
   * @param {Object} [data={}] - Data to be sent in the response
   * @param {string} [message="Request accepted"] - Success message
   */
  static accepted(res, message = "Request accepted", data = {}) {
    return res.status(202).json({ success: true, message, data });
  }

  /**
   * Sends a 204 No Content response
   * @param {Object} res - Express response object
   * @param {string} [message="No content"] - Success message
   */
  static noContent(res, message = "No content", data = {}) {
    return res.status(204).json({ success: true, message, data });
  }

  /**
   * Sends a 206 Partial Content response
   * @param {Object} res - Express response object
   * @param {Object} data - Partial data to be sent in the response
   * @param {string} [message="Partial content"] - Success message
   */
  static partialContent(res, message = "Partial content", data = {}) {
    return res.status(206).json({ success: true, message, data });
  }
}
