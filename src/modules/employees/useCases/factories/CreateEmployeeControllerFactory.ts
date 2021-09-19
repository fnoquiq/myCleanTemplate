import { Controller } from '@shared/protocols/infra/Controller'
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BcryptHashProvider'

import { PrismaEmployeesRepository } from '@modules/employees/infra/repository/prisma/PrismaEmployeesRepository'

import { CreateEmployee } from '../CreateEmployee'
import { CreateEmployeeController } from '../CreateEmployeeController'

export function makeCreateEmployeeController(): Controller {
  const employeesRepository = new PrismaEmployeesRepository()
  const hashProvider = new BCryptHashProvider()
  const createEmployee = new CreateEmployee(employeesRepository, hashProvider)
  const createEmployeeController = new CreateEmployeeController(createEmployee)

  return createEmployeeController
}
