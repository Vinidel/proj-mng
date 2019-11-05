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
  UserId: Joi.number(),
});

const projectUpdateRequestSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  UserId: Joi.number(),
}).min(1);

const userUpdateRequestSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
}).min(1);

module.exports = {
  userRequestSchema,
  authorizationSchema,
  projectRequestSchema,
  projectUpdateRequestSchema,
  userUpdateRequestSchema,
};
