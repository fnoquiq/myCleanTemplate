import { v4 as uuid } from 'uuid'

import { Employee } from '@modules/employees/domain/Employee'

import { CreateEmployeeDTO, IEmployeesRepository } from '../IEmployeesRepository'

export class InMemoryEmployeesRepository implements IEmployeesRepository {
  private employees: Employee[] = []

  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const employee: Employee = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    }

    this.employees.push(employee)

    return employee
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = this.employees.find(employee => employee.cpf === cpf)

    if (!employee) {
      return null
    }
    return employee
  }
}
