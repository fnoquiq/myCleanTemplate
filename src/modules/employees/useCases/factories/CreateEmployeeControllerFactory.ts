import { Controller } from '@shared/protocols/infra/Controller'

import { PrismaEmployeesRepository } from '@modules/employees/infra/repository/prisma/PrismaEmployeesRepository'

import { CreateEmployee } from '../CreateEmployee'
import { CreateEmployeeController } from '../CreateEmployeeController'

export function makeCreateEmployeeController(): Controller {
  const prismaEmployeesRepository = new PrismaEmployeesRepository()
  const createEmployee = new CreateEmployee(prismaEmployeesRepository)
  const createEmployeeController = new CreateEmployeeController(createEmployee)

  return createEmployeeController
}
