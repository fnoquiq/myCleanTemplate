/**
 * @jest-environment ./src/shared/infra/prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/prisma'

import { Role } from '@modules/employees/domain/Role'

const VALID_CPF = '43916550047'
const NON_EXIST_CPF = '59959648010'

describe('Authenticate Employee Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })
  test('deve autenticar um funcionário', async () => {
    await request(app).post('/api/employees').send({
      cpf: VALID_CPF,
      name: 'valid-name',
      password: 'valid-password',
      password_confirmation: 'valid-password',
      role: Role.ADMIN,
    })

    const response = await request(app).post('/api/login').send({
      cpf: VALID_CPF,
      password: 'valid-password',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('employeeId')
  })

  test('não deve autenticar se estiver com erros de validação', async () => {
    const response = await request(app).post('/api/login').send({
      cpf: VALID_CPF,
      // password is required
    })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('ValidationError')
  })

  test('não deve autenticar se as credenciais estiverem erradas', async () => {
    const response = await request(app).post('/api/login').send({
      cpf: NON_EXIST_CPF,
      password: 'invalid-password',
    })

    expect(response.status).toBe(400)
    expect(response.body.error.name).toEqual('InvalidCpfOrPasswordError')
  })
})
