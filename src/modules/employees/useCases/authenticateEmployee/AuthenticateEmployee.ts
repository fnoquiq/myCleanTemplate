import { Either, left, right } from '@shared/protocols/logic/Either'
import { IHashProvider } from '@shared/providers/HashProvider/IHashProvider'
import { IJwtProvider } from '@shared/providers/JwtProvider/IJwtProvider'

import { IEmployeesRepository } from '@modules/employees/infra/repository/IEmployeesRepository'

import { InvalidCpfOrPasswordError } from '../errors/InvalidCpfOrPasswordError'

interface AuthenticateEmployeeRequest {
  cpf: string
  password: string
}

type AuthenticateEmployeeResponse = Either<
  InvalidCpfOrPasswordError,
  { token: string; employeeId: string }
>

export class AuthenticateEmployee {
  private readonly ACCESS_TOKEN_EXPIRES_IN = '1d'

  constructor(
    private employeesRepository: IEmployeesRepository,
    private jwtProvider: IJwtProvider,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: AuthenticateEmployeeRequest): Promise<AuthenticateEmployeeResponse> {
    const { cpf, password } = data

    const employee = await this.employeesRepository.findByCpf(cpf)

    if (!employee) {
      return left(new InvalidCpfOrPasswordError())
    }

    const isPasswordValid = await this.hashProvider.compareHash(password, employee.password)
    if (!isPasswordValid) {
      return left(new InvalidCpfOrPasswordError())
    }

    const token = this.jwtProvider.create({
      subject: employee.id,
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    })

    return right({
      token,
      employeeId: employee.id,
    })
  }
}
