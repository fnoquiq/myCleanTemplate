import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import { Either, left, right } from '@shared/protocols/logic/Either'

import { InvalidJwtTokenError } from '../errors/InvalidJwtTokenError'
import { ICreateJwtProvider, IJwtProvider, JwtTokenPayload } from '../IJwtProvider'

export class JsonWebTokenJwtProvider implements IJwtProvider {
  private readonly JWT_SECRET: string

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET ?? 'secret_default'
  }

  create({ subject, expiresIn }: ICreateJwtProvider): string {
    return jwt.sign({}, this.JWT_SECRET, {
      subject,
      expiresIn,
    })
  }

  verify(token: string): Either<InvalidJwtTokenError, JwtTokenPayload> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JwtTokenPayload
      return right(decoded)
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return left(new InvalidJwtTokenError())
      }
      throw err
    }
  }
}
