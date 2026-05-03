/*
  Middleware to validate request body against a Zod schema.
*/
export const validateDetails = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error.errors) {
            const messages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        next(error);
    }
};
