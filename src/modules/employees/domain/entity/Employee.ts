import { Role } from '.prisma/client'

export interface Employee {
  cpf: string
  name: string
  password: string
  role: Role
  createdAt: Date
  updatedAt: Date
}
