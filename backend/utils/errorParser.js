export const extractValidationErrorMessage = (error) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return messages.length === 1 ? messages[0] : messages;
  }

  if (error.code && error.code === 11000) {
    // MongoDB duplicate key error
    const field = Object.keys(error.keyValue)[0];
    return `Duplicate value for "${field}" — it must be unique.`;
  }

  if (error.name === "CastError") {
    return `Invalid ${error.path}: ${error.value}`;
  }

  if (error.name === "JsonWebTokenError") {
    return "Invalid token. Please log in again.";
  }

  if (error.name === "TokenExpiredError") {
    return "Session expired. Please log in again.";
  }

  return error.message || "An unexpected error occurred";
};
