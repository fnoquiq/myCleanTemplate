import { Entity } from '@shared/protocols/domain/Entity'

import { Role } from './Role'

interface IEmployeeProps {
  cpf: string
  name: string
  password: string
  role: Role
  createdAt?: Date
  updatedAt?: Date
}

export class Employee extends Entity<IEmployeeProps> {
  private constructor(props: IEmployeeProps, id?: string) {
    super(props, id)
  }

  get cpf() {
    return this.props.cpf
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: IEmployeeProps, id?: string) {
    return new Employee(
      {
        ...props,
      },
      id
    )
  }
}
