const { Joi, validate } = require('express-validation');

let authValidator = {};
const registerPostIn = {
    headers: Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{2,30}/)
            .required(),
        role: Joi.string()
    })
}
authValidator.registerValidation = validate(registerPostIn, {}, { allowUnknown: true })

const loginPostIn = {
    headers: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{6,30}/)
            .required(),
    })
}
authValidator.loginValidation = validate(loginPostIn, {}, { allowUnknown: true })

module.exports = authValidator;