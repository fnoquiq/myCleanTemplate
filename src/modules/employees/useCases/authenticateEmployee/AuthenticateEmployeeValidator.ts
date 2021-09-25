import Joi from '@hapi/joi'

import { cpfValidator } from '@shared/infra/joi/customValidators'

export const authenticateEmployeeValidator = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required().trim().custom(cpfValidator),
    password: Joi.string().required().trim().min(3),
  }),
})
