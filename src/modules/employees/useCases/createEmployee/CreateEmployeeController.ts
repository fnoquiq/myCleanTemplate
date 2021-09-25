import { Controller } from '@shared/protocols/infra/Controller'
import { HttpRequest } from '@shared/protocols/infra/HttpRequest'
import { badRequest, created, HttpResponse } from '@shared/protocols/infra/HttpResponse'

import { EmployeeMapper } from '../../mappers/EmployeeMapper'
import { CreateEmployee } from './CreateEmployee'
import { createEmployeeValidator } from './CreateEmployeeValidator'
export class CreateEmployeeController implements Controller {
  constructor(private createEmployee: CreateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationResult = createEmployeeValidator.validate(httpRequest)

    if (validationResult.isLeft()) {
      return badRequest(validationResult.value)
    }

    const { cpf, name, password, role } = validationResult.value.body

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
