import Joi from 'joi'

export const authenticateEmployeeValidator = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  }),
})
