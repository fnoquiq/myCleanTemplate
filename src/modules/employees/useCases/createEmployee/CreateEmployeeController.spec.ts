/**
 * @jest-environment ./src/shared/infra/prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { createAndAuthenticateEmployee } from '@shared/helpers/test/EmployeeFactory'
import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/prisma'

import { Role } from '../../domain/Role'

const { validToken } = createAndAuthenticateEmployee()
const VALID_CPF = '43916550047'
const VALID_ROLE = Role.ADMIN

describe('Create Employee Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve criar um funcionário', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('x-access-token', validToken)
      .send({
        cpf: VALID_CPF,
        name: 'valid-name',
        password: 'valid-password',
        password_confirmation: 'valid-password',
        role: VALID_ROLE,
      })

    expect(response.status).toBe(201)

    const employeeInDatabase = await prisma.employee.findUnique({
      where: { cpf: VALID_CPF },
    })

    expect(employeeInDatabase).toBeTruthy()
  })

  test('não deve criar um funcionário com erro de validação', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('x-access-token', validToken)
      .send({
        cpf: VALID_CPF,
        name: 'valid-name',
        password: 'valid-password', // missing password_confirmation
        role: VALID_ROLE,
      })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('ValidationError')
  })

  test('não deve criar um funcionário caso o cpf já esteja cadastrado', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('x-access-token', validToken)
      .send({
        cpf: VALID_CPF,
        name: 'valid-name',
        password: 'valid-password',
        password_confirmation: 'valid-password',
        role: VALID_ROLE,
      })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('CpfAlreadyExistsError')
  })
})
