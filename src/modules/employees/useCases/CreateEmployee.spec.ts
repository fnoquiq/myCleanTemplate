import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakerHashProvider'
import IHashProvider from '@shared/providers/HashProvider/IHashProvider'

import { Employee } from '../domain/Employee'
import { Role } from '../domain/Role'
import { IEmployeesRepository } from '../infra/repository/IEmployeesRepository'
import { InMemoryEmployeesRepository } from '../infra/repository/in-memory/InMemoryEmployeesRepository'
import { CreateEmployee } from './CreateEmployee'
import { CpfAlreadyExistsError } from './errors/CpfAlreadyExistsError'

let employeesRepository: IEmployeesRepository
let hashProvider: IHashProvider
let createEmployee: CreateEmployee

describe('Create Employee', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    hashProvider = new FakeHashProvider()
    createEmployee = new CreateEmployee(employeesRepository, hashProvider)
  })

  test('deve criar um funcionário', async () => {
    const result = await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('id')
  })

  test('deve criar um funcionário com a senha hashed', async () => {
    const result = await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    expect(result.isRight()).toBeTruthy()

    const hashedPassword = (result.value as Employee).password
    const isHashed = await hashProvider.compareHash('valid-password', hashedPassword)

    expect(isHashed).toBeTruthy()
  })

  test('não deve criar um funcionário com cpf duplicado', async () => {
    await createEmployee.execute({
      cpf: 'duplicated-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    const result = await createEmployee.execute({
      cpf: 'duplicated-cpf',
      name: 'another-valid-name',
      password: 'another-valid-password',
      role: Role.USER,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new CpfAlreadyExistsError('duplicated-cpf'))
  })
})
