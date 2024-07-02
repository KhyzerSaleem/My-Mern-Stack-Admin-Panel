const Joi = require("joi");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate the request body
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    } catch (error) {
      //   res.status(500).json("Internal Server Error");
      next(error); //It Comes From error-Middleware;
    }
  };
};

module.exports = validate;
