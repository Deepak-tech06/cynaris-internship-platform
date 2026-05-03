import AppError from "../utils/AppError.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsedData.body;
      req.query = parsedData.query;
      req.params = parsedData.params;
      next();
    } catch (error) {
      if (error.errors) {
        const message = error.errors.map((e) => e.message).join(", ");
        return next(new AppError(message, 400));
      }
      return next(new AppError("Invalid request data", 400));
    }
  };
};
