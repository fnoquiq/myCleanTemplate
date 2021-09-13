import { Employee } from '../domain/Employee'
import { Role } from '../domain/Role'
import { IEmployeesRepository } from '../repository/IEmployeesRepository'
import { CpfAlreadyExistsError } from './error/CpfAlreadyExistsError'

interface ICreateEmployee {
  cpf: string
  name: string
  password: string
  role: Role
}

export class CreateEmployee {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: ICreateEmployee): Promise<Employee> {
    const { cpf, name, password, role } = data

    const cpfAlreadyExists = await this.employeesRepository.findByCpf(cpf)

    if (cpfAlreadyExists) {
      throw new CpfAlreadyExistsError(cpf)
    }

    const employee = await this.employeesRepository.create({ cpf, name, password, role })

    return employee
  }
}
