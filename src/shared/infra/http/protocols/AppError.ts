export interface AppErrorPayload {
  message: string
  name: string
  body?: any
}

export abstract class AppError extends Error {
  name: string
  message: string
  body?: any

  constructor({ name, message, body }: AppErrorPayload) {
    super(`${name}: ${message}`)
    this.name = name
    this.message = message
    this.body = body
  }
}
