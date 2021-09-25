import Joi from '@hapi/joi'

export const authenticateEmployeeValidator = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required(),
    password: Joi.string().required().trim(),
  }),
})
