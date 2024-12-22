/**
 * Wraps an async route handler to handle errors automatically
 * @param {Function} requestHandler - Async function that handles the route
 * @returns {Function} Express middleware function
 */
const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default asyncHandler;
