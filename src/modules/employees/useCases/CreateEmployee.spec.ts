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
    const employee = await createEmployee.execute({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    expect(employee).toHaveProperty('id')
  })

  test('não deve criar um funcionário com cpf duplicado', async () => {
    await createEmployee.execute({
      cpf: 'duplicated-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    await expect(
      createEmployee.execute({
        cpf: 'duplicated-cpf',
        name: 'Gabriel Mesquita',
        password: '123',
        role: Role.ADMIN,
      })
    ).rejects.toEqual(new CpfAlreadyExistsError('duplicated-cpf'))
  })
})
