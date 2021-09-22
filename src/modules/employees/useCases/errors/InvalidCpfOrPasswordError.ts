import { AppError } from '@shared/protocols/domain/AppError'

export class InvalidCpfOrPasswordError extends AppError {
  constructor() {
    super({
      name: 'InvalidCpfOrPasswordError',
      message: 'Cpf ou senha incorretos!',
    })
  }
}
