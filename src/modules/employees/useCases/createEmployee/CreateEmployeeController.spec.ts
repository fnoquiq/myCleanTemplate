/**
 * @jest-environment ./src/shared/infra/prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/prisma'

import { Role } from '../../domain/Role'

const VALID_CPF = '43916550047'

describe('Create Employee Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve criar um funcionário', async () => {
    const response = await request(app).post('/api/employees').send({
      cpf: VALID_CPF,
      name: 'valid-name',
      password: 'valid-password',
      password_confirmation: 'valid-password',
      role: Role.ADMIN,
    })

    expect(response.status).toBe(201)

    const employeeInDatabase = await prisma.employee.findUnique({
      where: { cpf: VALID_CPF },
    })

    expect(employeeInDatabase).toBeTruthy()
  })

  test('não deve criar um funcionário com erro de validação', async () => {
    const response = await request(app).post('/api/employees').send({
      cpf: VALID_CPF,
      name: 'valid-name',
      password: 'valid-password', // missing password_confirmation
      role: Role.ADMIN,
    })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('ValidationError')
  })

  test('não deve criar um funcionário caso o cpf já esteja cadastrado', async () => {
    const response = await request(app).post('/api/employees').send({
      cpf: VALID_CPF,
      name: 'valid-name',
      password: 'valid-password',
      password_confirmation: 'valid-password',
      role: Role.ADMIN,
    })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('CpfAlreadyExistsError')
  })
})
