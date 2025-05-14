import { extractValidationErrorMessage } from "./errorParser.js";

export const sendSuccessResponse = (
  res,
  message,
  data = {},
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const sendError = (
  res,
  message = "Something went wrong",
  errors = {},
  statusCode = 500
) => {
  let parsedErrors = errors;

  // Automatically extract readable error message if Error object
  if (errors instanceof Error) {
    parsedErrors = {
      message: extractValidationErrorMessage(errors),
    };

    // 🔽 Auto-detect appropriate status code
    if (errors.name === "ValidationError" || errors.name === "CastError") {
      statusCode = 400;
    } else if (errors.code === 11000) {
      statusCode = 409; // Duplicate entry
    } else if (errors.name === "JsonWebTokenError") {
      statusCode = 401;
    } else if (errors.name === "TokenExpiredError") {
      statusCode = 403;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors: parsedErrors,
  });

  return res.status(statusCode).json({
    success: false,
    message,
    errors: parsedErrors,
  });
};
