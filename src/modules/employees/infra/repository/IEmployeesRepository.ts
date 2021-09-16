import { Employee } from '@modules/employees/domain/Employee'
import { Role } from '@modules/employees/domain/Role'

export interface CreateEmployeeDTO {
  cpf: string
  name: string
  password: string
  role: Role
}

export interface IEmployeesRepository {
  create(data: CreateEmployeeDTO): Promise<Employee>
  findByCpf(cpf: string): Promise<Employee | null>
}
