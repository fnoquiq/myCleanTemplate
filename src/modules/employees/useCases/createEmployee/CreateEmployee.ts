import { Either, left, right } from '@shared/protocols/logic/Either'
import IHashProvider from '@shared/providers/HashProvider/IHashProvider'

import { Employee } from '../../domain/Employee'
import { Role } from '../../domain/Role'
import { IEmployeesRepository } from '../../infra/repository/IEmployeesRepository'
import { CpfAlreadyExistsError } from '../errors/CpfAlreadyExistsError'

interface CreateEmployeeRequest {
  cpf: string
  name: string
  password: string
  role: Role
}

type CreateEmployeeResponse = Either<CpfAlreadyExistsError, Employee>

export class CreateEmployee {
  constructor(
    private employeesRepository: IEmployeesRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: CreateEmployeeRequest): Promise<CreateEmployeeResponse> {
    const { cpf, name, password, role } = data

    const cpfAlreadyExists = await this.employeesRepository.findByCpf(cpf)

    if (cpfAlreadyExists) {
      return left(new CpfAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const employee = await this.employeesRepository.create({
      cpf,
      name,
      role,
      password: hashedPassword,
    })

    return right(employee)
  }
}
