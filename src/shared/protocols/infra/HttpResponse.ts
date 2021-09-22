import { AppError } from '@shared/protocols/domain/AppError'

export type HttpResponse = {
  statusCode: number
  error?: {
    name: string
    message: string
    body?: any
  }
  data?: any
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  data,
})

export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: 400,
  error,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  error: {
    name: 'InternalServerError',
    message: 'Um erro inesperado aconteceu! Tente novamente!',
  },
})
