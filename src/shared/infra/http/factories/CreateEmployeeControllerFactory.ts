import { PrismaEmployeesRepository } from '@modules/employees/infra/repository/prisma/PrismaEmployeesRepository'
import { CreateEmployee } from '@modules/employees/useCases/CreateEmployee'
import { CreateEmployeeController } from '@modules/employees/useCases/CreateEmployeeController'

import { Controller } from '../../../protocols/infra/Controller'

export function makeCreateEmployeeController(): Controller {
  const prismaEmployeesRepository = new PrismaEmployeesRepository()
  const createEmployee = new CreateEmployee(prismaEmployeesRepository)
  const createEmployeeController = new CreateEmployeeController(createEmployee)

  return createEmployeeController
}
