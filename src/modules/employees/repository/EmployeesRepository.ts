import { Role } from '.prisma/client'

export interface CreateEmployeeDTO {
  cpf: string
  name: string
  password: string
  role: Role
}

export interface EmployeesRepository {
  create(data: CreateEmployeeDTO): Promise<void>
}
