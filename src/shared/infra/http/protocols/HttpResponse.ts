import { AppError } from '@shared/domain/errors/AppError'

export type HttpResponse = {
  statusCode: number
  body: any
}

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
})

export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    name: 'InternalServerError',
    message: 'Um erro inesperado aconteceu! Tente novamente!',
  },
})
