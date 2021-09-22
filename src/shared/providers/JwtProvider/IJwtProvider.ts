import { Either } from '@shared/protocols/logic/Either'

import { InvalidJwtTokenError } from './errors/InvalidJwtTokenError'

export interface ICreateJwtProvider {
  subject: string
  expiresIn: string
}

export interface JwtTokenPayload {
  exp: number
  sub: string
}

export interface IJwtProvider {
  create(data: ICreateJwtProvider): string
  verify(token: string): Either<InvalidJwtTokenError, JwtTokenPayload>
}
