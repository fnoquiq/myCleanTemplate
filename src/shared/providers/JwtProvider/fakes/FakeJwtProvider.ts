import { Either, left, right } from '@shared/protocols/logic/Either'

import { InvalidJwtTokenError } from '../errors/InvalidJwtTokenError'
import { ICreateJwtProvider, IJwtProvider, JwtTokenPayload } from '../IJwtProvider'

export class FakeJwtProvider implements IJwtProvider {
  create({ subject, expiresIn }: ICreateJwtProvider): string {
    return `valid-token-${subject}:${expiresIn}`
  }

  verify(token: string): Either<InvalidJwtTokenError, JwtTokenPayload> {
    if (!token.startsWith('valid-token-')) {
      return left(new InvalidJwtTokenError())
    }
    const payload = token.replace('valid-token-', '').split(':')

    return right({
      sub: payload[0],
      exp: parseInt(payload[1]),
    })
  }
}
