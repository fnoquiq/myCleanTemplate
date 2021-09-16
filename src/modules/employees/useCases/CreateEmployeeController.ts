import { Controller } from '@shared/infra/http/protocols/Controller'
import { HttpRequest } from '@shared/infra/http/protocols/HttpRequest'
import {
  badRequest,
  created,
  HttpResponse,
  serverError,
} from '@shared/infra/http/protocols/HttpResponse'

import { CreateEmployee } from './CreateEmployee'

export class CreateEmployeeController implements Controller {
  constructor(private createEmployee: CreateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      return created(result.value)
    } catch (error) {
      return serverError(new Error('Unexpected error on CreateEmployeeController'))
    }
  }
}
