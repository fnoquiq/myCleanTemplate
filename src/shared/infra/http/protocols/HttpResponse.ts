import { AppError } from '../../../domain/protocols/AppError'

export type HttpResponse = {
  statusCode: number
  error?: {
    name: string
    message: string
    body?: any
  }
  success?: any
}

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  error: undefined,
  success: data,
})

export const badRequest = (error: AppError): HttpResponse => ({
  statusCode: 400,
  error,
  success: undefined,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  error,
  success: undefined,
})
