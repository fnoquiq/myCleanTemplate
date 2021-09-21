import Joi from 'joi'

import { Role } from '@modules/employees/domain/Role'

export const createEmployeeValidator = Joi.object({
  body: Joi.object({
    cpf: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
    password_confirmation: Joi.ref('password'),
    role: Joi.string().valid(...Object.values(Role)),
  }).with('password', 'password_confirmation'),
})
