import { prisma } from '@shared/infra/prisma'

import { Employee } from '@modules/employees/domain/Employee'
import { CreateEmployeeDTO } from '@modules/employees/dto/CreateEmployeeDTO'
import { EmployeeMapper } from '@modules/employees/mappers/EmployeeMapper'

import { IEmployeesRepository } from '../IEmployeesRepository'

export class PrismaEmployeesRepository implements IEmployeesRepository {
  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const { cpf, name, password, role } = data

    const employee = await prisma.employee.create({
      data: { cpf, name, password, role },
    })

    return EmployeeMapper.toDomain(employee)
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = await prisma.employee.findUnique({
      where: {
        cpf,
      },
    })

    if (!employee) {
      return null
    }

    return EmployeeMapper.toDomain(employee)
  }
}
