import Joi from 'joi'

import { cpfValidator } from '@shared/infra/joi/customValidators'
import { Validator } from '@shared/protocols/infra/Validator'

import { Role } from '@modules/employees/domain/Role'

interface CreateEmployeeProps {
  body: {
    cpf: string
    name: string
    password: string
    password_confirmation: string
    role: Role
  }
}

const createEmployeeSchema = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required().trim().custom(cpfValidator),
    name: Joi.string().required().trim().min(3),
    password: Joi.string().required().trim(),
    password_confirmation: Joi.ref('password'),
    role: Joi.string().valid(...Object.values(Role)),
  }).with('password', 'password_confirmation'),
})

const createEmployeeValidator = new Validator<CreateEmployeeProps>(createEmployeeSchema)

export { createEmployeeValidator }
