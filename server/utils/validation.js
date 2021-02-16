const Joi = require("joi");

const isValidationError = (error) => {
    return Joi.isError(error);
};

const registerValidationSchema = Joi.object({
    firstName: Joi.string().regex(/^[a-z]*$/).min(2).max(50).required(),
    lastName: Joi.string().regex(/^[a-z]*$/).min(2).max(50).required(),
    email: Joi.string().email().min(6).max(255).required(),
    username: Joi.string().alphanum().min(3).max(50).required(),
    password: Joi.string().min(6).max(1024).required(),
});

const loginValidationSchema = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
    isValidationError,
    registerValidationSchema,
    loginValidationSchema,
};
