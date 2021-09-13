import { AppError } from '@shared/infra/http/protocols/AppError'

export class CpfAlreadyExistsError extends AppError {
  constructor(cpf: string) {
    super({
      name: 'CpfAlreadyExistsError',
      message: 'Este cpf já está em uso!',
      body: cpf,
    })
  }
}
