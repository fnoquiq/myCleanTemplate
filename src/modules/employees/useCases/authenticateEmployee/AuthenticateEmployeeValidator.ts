import Joi from 'joi'

import { cpfValidator } from '@shared/infra/joi/customValidators'
import { Validator } from '@shared/protocols/infra/Validator'

interface AuthenticateEmployeeProps {
  body: {
    cpf: string
    password: string
  }
}

export const authenticateEmployeeSchema = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required().trim().custom(cpfValidator),
    password: Joi.string().required().trim().min(3),
  }),
})

const authenticateEmployeeValidator = new Validator<AuthenticateEmployeeProps>(
  authenticateEmployeeSchema
)

export { authenticateEmployeeValidator }
