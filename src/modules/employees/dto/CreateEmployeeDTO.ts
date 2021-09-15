import { Role } from '@modules/employees/domain/Role'

export interface CreateEmployeeDTO {
  cpf: string
  name: string
  password: string
  role: Role
}
