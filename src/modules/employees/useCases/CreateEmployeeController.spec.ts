/**
 * @jest-environment ./src/shared/infra/prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { app } from '@shared/infra/http/app'
import { prisma } from '@shared/infra/prisma'

import { Role } from '../domain/Role'

describe('Create Employee Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to register new user', async () => {
    const response = await request(app).post('/api/employees').send({
      cpf: 'valid-cpf',
      name: 'valid-name',
      password: 'valid-password',
      role: Role.ADMIN,
    })

    expect(response.status).toBe(201)

    const employeeInDatabase = await prisma.employee.findUnique({
      where: { cpf: 'valid-cpf' },
    })

    expect(employeeInDatabase).toBeTruthy()
  })
})
