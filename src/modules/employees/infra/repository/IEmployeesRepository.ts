import { CreateEmployeeDTO } from '@modules/employees/dto/CreateEmployeeDTO'

import { Employee } from '../../domain/Employee'

export interface IEmployeesRepository {
  create(data: CreateEmployeeDTO): Promise<Employee>
  findByCpf(cpf: string): Promise<Employee | null>
}
