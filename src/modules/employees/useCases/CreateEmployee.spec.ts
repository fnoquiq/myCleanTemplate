import { Role } from '../domain/Role'
import { IEmployeesRepository } from '../infra/repository/IEmployeesRepository'
import { InMemoryEmployeesRepository } from '../infra/repository/in-memory/InMemoryEmployeesRepository'
import { CreateEmployee } from './CreateEmployee'
import { CpfAlreadyExistsError } from './error/CpfAlreadyExistsError'

let employeesRepository: IEmployeesRepository
let createEmployee: CreateEmployee

describe('Create Employee', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    createEmployee = new CreateEmployee(employeesRepository)
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
