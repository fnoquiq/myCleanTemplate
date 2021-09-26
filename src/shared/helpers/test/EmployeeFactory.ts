import { IJwtProvider } from '@shared/providers/JwtProvider/IJwtProvider'
import { JsonWebTokenJwtProvider } from '@shared/providers/JwtProvider/implementations/JsonWebTokenJwtProvider'

import { Employee } from '@modules/employees/domain/Employee'
import { Role } from '@modules/employees/domain/Role'

interface EmployeeOverrides {
  id: string
  cpf: string
  name: string
  role: Role
  password: string
  createdAt: Date
  updatedAt: Date
}

export function createEmployee(overrides?: EmployeeOverrides) {
  const employee = Employee.create(
    {
      cpf: overrides?.cpf ?? '08775048060',
      name: overrides?.name ?? 'valid-name',
      password: overrides?.password ?? 'valid-password',
      role: overrides?.role ?? Role.ADMIN,
      createdAt: overrides?.createdAt ?? new Date(),
      updatedAt: overrides?.updatedAt ?? new Date(),
    },
    overrides?.id
  )

  return employee
}

export function createAndAuthenticateEmployee(overrides?: EmployeeOverrides) {
  const jwtProvider: IJwtProvider = new JsonWebTokenJwtProvider()
  const employee = createEmployee(overrides)
  const jwt = jwtProvider.create({
    subject: employee.id,
    expiresIn: '1d',
  })

  return {
    validAuthenticatedEmployee: employee,
    validToken: jwt,
  }
}
