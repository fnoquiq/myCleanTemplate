import { ValidationError } from '@shared/errors/ValidationError'
import { Controller } from '@shared/protocols/infra/Controller'
import { HttpRequest } from '@shared/protocols/infra/HttpRequest'
import { badRequest, created, HttpResponse } from '@shared/protocols/infra/HttpResponse'

import { EmployeeMapper } from '../../mappers/EmployeeMapper'
import { CreateEmployee } from './CreateEmployee'
import { createEmployeeValidator } from './CreateEmployeeValidator'
export class CreateEmployeeController implements Controller {
  constructor(private createEmployee: CreateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { error } = createEmployeeValidator.validate(httpRequest)

    if (error) {
      return badRequest(new ValidationError(error.details))
    }

    const { cpf, name, password, role } = httpRequest.body

    const result = await this.createEmployee.execute({
      cpf,
      name,
      password,
      role,
    })

    if (result.isLeft()) {
      return badRequest(result.value)
    }

    const employeeView = EmployeeMapper.toView(result.value)
    return created(employeeView)
  }
}