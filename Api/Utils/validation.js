const Joi = require('@hapi/joi')

module.exports.register = (data) => {
    const Schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email()
    })

    return Schema.validate(data)
}

module.exports.login = (data) => {
    const Schema = Joi.object({
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email()
    })

    return Schema.validate(data)
}
