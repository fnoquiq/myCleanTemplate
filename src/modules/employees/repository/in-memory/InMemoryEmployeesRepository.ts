import { v4 as uuid } from 'uuid'

import { Employee } from '.prisma/client'

import { CreateEmployeeDTO, EmployeesRepository } from '../EmployeesRepository'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  private employees: Employee[] = []

  async create(data: CreateEmployeeDTO): Promise<void> {
    const employee: Employee = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    }
    this.employees.push(employee)
  }
}
