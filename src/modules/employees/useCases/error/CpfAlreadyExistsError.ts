import { AppError } from '@shared/domain/errors/AppError'

export class CpfAlreadyExistsError extends AppError {
  constructor(cpf: string) {
    super({
      name: 'CpfAlreadyExistsError',
      message: 'Este cpf já está em uso!',
      body: cpf,
    })
  }
}
