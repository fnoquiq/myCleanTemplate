import { AccessTokenRequiredError } from '@shared/errors/AccessTokenRequiredError'
import { HttpRequest } from '@shared/protocols/infra/HttpRequest'
import { forbidden, HttpResponse, ok } from '@shared/protocols/infra/HttpResponse'
import { Middleware } from '@shared/protocols/infra/Middleware'
import { IJwtProvider } from '@shared/providers/JwtProvider/IJwtProvider'

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor(private readonly jwtProvider: IJwtProvider) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accessToken } = httpRequest.headers

    if (accessToken) {
      const result = this.jwtProvider.verify(accessToken)

      if (result.isLeft()) {
        return forbidden(result.value)
      }

      return ok({ userId: result.value.sub })
    }

    return forbidden(new AccessTokenRequiredError())
  }
}
