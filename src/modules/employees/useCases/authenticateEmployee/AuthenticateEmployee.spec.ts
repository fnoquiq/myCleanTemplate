import { FakeHashProvider } from '@shared/providers/HashProvider/fakes/FakerHashProvider'
import { IHashProvider } from '@shared/providers/HashProvider/IHashProvider'
import { FakeJwtProvider } from '@shared/providers/JwtProvider/fakes/FakeJwtProvider'
import { IJwtProvider, JwtTokenPayload } from '@shared/providers/JwtProvider/IJwtProvider'

import { Employee } from '@modules/employees/domain/Employee'
import { Role } from '@modules/employees/domain/Role'
import { IEmployeesRepository } from '@modules/employees/infra/repository/IEmployeesRepository'
import { InMemoryEmployeesRepository } from '@modules/employees/infra/repository/in-memory/InMemoryEmployeesRepository'

import { CreateEmployee } from '../createEmployee/CreateEmployee'
import { InvalidCpfOrPasswordError } from '../errors/InvalidCpfOrPasswordError'
import { AuthenticateEmployee } from './AuthenticateEmployee'

let employeesRepository: IEmployeesRepository
let jwtProvider: IJwtProvider
let hashProvider: IHashProvider
let authenticateEmployee: AuthenticateEmployee
let createEmployee: CreateEmployee

describe('Authenticate Employee', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    jwtProvider = new FakeJwtProvider()
    hashProvider = new FakeHashProvider()
    authenticateEmployee = new AuthenticateEmployee(employeesRepository, jwtProvider, hashProvider)
    createEmployee = new CreateEmployee(employeesRepository, hashProvider)
  })

  test('deve autenticar um funcionário', async () => {
    await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    const result = await authenticateEmployee.execute({
      cpf: 'valid-cpf',
      password: 'valid-password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('token')
    expect(result.value).toHaveProperty('employeeId')
  })

  test('deve retornar um token válido', async () => {
    const resultCreateEmployee = await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })
    const employee = resultCreateEmployee.value as Employee

    const result = await authenticateEmployee.execute({
      cpf: 'valid-cpf',
      password: 'valid-password',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      const { sub } = jwtProvider.verify(result.value.token).value as JwtTokenPayload
      expect(sub).toEqual(employee.id)
    }
  })

  test('não deve autenticar um funcionário que não esteja cadastrado', async () => {
    const result = await authenticateEmployee.execute({
      cpf: 'valid-cpf',
      password: 'valid-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new InvalidCpfOrPasswordError())
  })

  test('não deve autenticar um funcionário com a senha inválida', async () => {
    await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    const result = await authenticateEmployee.execute({
      cpf: 'valid-cpf',
      password: 'invalid-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new InvalidCpfOrPasswordError())
  })
})
