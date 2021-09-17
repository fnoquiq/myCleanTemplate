import { Router } from 'express'

import { adaptRoute } from '@shared/infra/http/protocols/AdaptRoute'

import { PrismaEmployeesRepository } from '@modules/employees/infra/repository/prisma/PrismaEmployeesRepository'
import { CreateEmployee } from '@modules/employees/useCases/CreateEmployee'
import { CreateEmployeeController } from '@modules/employees/useCases/CreateEmployeeController'

const employeeRepository = new PrismaEmployeesRepository()
const createEmployee = new CreateEmployee(employeeRepository)
const createEmployeeController = new CreateEmployeeController(createEmployee)

export default (router: Router): void => {
  router.post('/employees', adaptRoute(createEmployeeController))
}
