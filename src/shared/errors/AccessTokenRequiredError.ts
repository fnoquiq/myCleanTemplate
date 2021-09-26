import { AppError } from '@shared/protocols/domain/AppError'

export class AccessTokenRequiredError extends AppError {
  constructor() {
    super({
      name: 'AccessTokenRequiredError',
      message: 'Você precisa estar logado para ter acesso a este conteúdo!',
    })
  }
}
