import { AppError } from '@shared/protocols/domain/AppError'

export class InvalidJwtTokenError extends AppError {
  constructor() {
    super({
      name: 'InvalidJwtTokenError',
      message: 'Token inválido',
    })
  }
}
