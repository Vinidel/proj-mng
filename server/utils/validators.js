const Joi = require('@hapi/joi');

const userRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const authorizationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  userRequestSchema,
  authorizationSchema,
};
