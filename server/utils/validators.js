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

const projectRequestSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.number(),
});

const projectUpdateRequestSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  userId: Joi.number(),
});

const userUpdateeRequestSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
});

module.exports = {
  userRequestSchema,
  authorizationSchema,
  projectRequestSchema,
  projectUpdateRequestSchema,
  userUpdateeRequestSchema,
};
