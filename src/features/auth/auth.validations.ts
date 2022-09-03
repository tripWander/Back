import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20),
});

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  age: Joi.number().min(16),
});
