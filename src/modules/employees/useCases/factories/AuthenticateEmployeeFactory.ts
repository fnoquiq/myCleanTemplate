import { Controller } from '@shared/protocols/infra/Controller'
import { BCryptHashProvider } from '@shared/providers/HashProvider/implementations/BcryptHashProvider'
import { JsonWebTokenJwtProvider } from '@shared/providers/JwtProvider/implementations/JsonWebTokenJwtProvider'

import { PrismaEmployeesRepository } from '@modules/employees/infra/repository/prisma/PrismaEmployeesRepository'

import { AuthenticateEmployee } from '../authenticateEmployee/AuthenticateEmployee'
import { AuthenticateEmployeeController } from '../authenticateEmployee/AuthenticateEmployeeController'

export function makeAuthenticateEmployeeController(): Controller {
  const employeesRepository = new PrismaEmployeesRepository()
  const jwtProvider = new JsonWebTokenJwtProvider()
  const hashProvider = new BCryptHashProvider()
  const authenticateEmployee = new AuthenticateEmployee(
    employeesRepository,
    jwtProvider,
    hashProvider
  )
  const authenticateEmployeeController = new AuthenticateEmployeeController(authenticateEmployee)

  return authenticateEmployeeController
}
