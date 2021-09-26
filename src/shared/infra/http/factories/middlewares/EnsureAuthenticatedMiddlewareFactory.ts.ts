import { Middleware } from '@shared/protocols/infra/Middleware'
import { JsonWebTokenJwtProvider } from '@shared/providers/JwtProvider/implementations/JsonWebTokenJwtProvider'

import { EnsureAuthenticatedMiddleware } from '../../middlewares/EnsureAuthenticatedMiddleware'

export function makeEnsureAuthenticatedMiddleware(): Middleware {
  const jwtProvider = new JsonWebTokenJwtProvider()
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(jwtProvider)

  return ensureAuthenticatedMiddleware
}
