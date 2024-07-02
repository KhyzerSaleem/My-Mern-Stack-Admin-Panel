const Joi = require("joi");

const validateContact = (contact) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).max(500).required(),
  });

  return schema.validate(contact);
};

module.exports = validateContact;
