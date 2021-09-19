import { Either, left, right } from '@shared/domain/errors/Either'

import { Employee } from '../domain/Employee'
import { Role } from '../domain/Role'
import { IEmployeesRepository } from '../infra/repository/IEmployeesRepository'
import { CpfAlreadyExistsError } from './errors/CpfAlreadyExistsError'

interface CreateEmployeeRequest {
  cpf: string
  name: string
  password: string
  role: Role
}

type CreateEmployeeResponse = Either<CpfAlreadyExistsError, Employee>

export class CreateEmployee {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: CreateEmployeeRequest): Promise<CreateEmployeeResponse> {
    const { cpf, name, password, role } = data

    const cpfAlreadyExists = await this.employeesRepository.findByCpf(cpf)

    if (cpfAlreadyExists) {
      return left(new CpfAlreadyExistsError(cpf))
    }

    const employee = await this.employeesRepository.create({ cpf, name, password, role })

    return right(employee)
  }
}
