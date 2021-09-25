import { Controller } from '@shared/protocols/infra/Controller'
import { HttpRequest } from '@shared/protocols/infra/HttpRequest'
import { badRequest, HttpResponse, ok } from '@shared/protocols/infra/HttpResponse'

import { AuthenticateEmployee } from './AuthenticateEmployee'
import { authenticateEmployeeValidator } from './AuthenticateEmployeeValidator'
export class AuthenticateEmployeeController implements Controller {
  constructor(private authenticateEmployee: AuthenticateEmployee) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationResult = authenticateEmployeeValidator.validate(httpRequest)

    if (validationResult.isLeft()) {
      return badRequest(validationResult.value)
    }

    const { cpf, password } = validationResult.value.body

    const result = await this.authenticateEmployee.execute({ cpf, password })

    if (result.isLeft()) {
      return badRequest(result.value)
    }

    return ok(result.value)
  }
}
