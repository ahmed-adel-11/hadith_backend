const joi = require("joi");

const createUserValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = { createUserValidation, loginValidation };
