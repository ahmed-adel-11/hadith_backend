const ApiError = require("../utils/apiError");

const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "forbidden");
    }

    next();
  };
};

module.exports = authorizeMiddleware;
