import { Employee as PersistanceEmployee } from '.prisma/client'

import { Employee } from '@modules/employees/domain/Employee'

export class EmployeeMapper {
  static toDomain(raw: PersistanceEmployee): Employee {
    return Employee.create(
      {
        cpf: raw.cpf,
        name: raw.name,
        password: raw.password,
        role: raw.role,
      },
      raw.id
    )
  }

  static toView(raw: Employee) {
    return {
      id: raw.id,
      props: {
        ...raw.props,
        password: undefined,
      },
    }
  }
}
