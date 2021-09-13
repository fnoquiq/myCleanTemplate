import { Role } from '../domain/Role'
import { IEmployeesRepository } from '../repository/IEmployeesRepository'
import { InMemoryEmployeesRepository } from '../repository/in-memory/InMemoryEmployeesRepository'
import { CreateEmployee } from './CreateEmployee'

let employeesRepository: IEmployeesRepository
let createEmployee: CreateEmployee

describe('Create Employee', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    createEmployee = new CreateEmployee(employeesRepository)
  })

  test('deve criar um usuário', async () => {
    const employee = await createEmployee.execute({
      cpf: '111.111.111-11',
      name: 'Gabriel Mesquita',
      password: '123',
      role: Role.ADMIN,
    })

    expect(employee).toHaveProperty('id')
  })
})
