export interface AppErrorPayload {
  message: string
  name: string
  body?: any
}

export abstract class AppError {
  name: string
  message: string
  body?: any

  constructor({ name, message, body }: AppErrorPayload) {
    this.name = name
    this.message = message
    this.body = body
  }
}
