import { AppError } from '@shared/protocols/domain/AppError'

export class ValidationError extends AppError {
  constructor(validationErrors: any) {
    super({
      name: 'ValidationError',
      message: 'Verifique os campos digitados, algo não está certo!',
      body: validationErrors,
    })
  }
}
