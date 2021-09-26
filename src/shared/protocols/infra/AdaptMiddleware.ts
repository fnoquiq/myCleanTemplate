import { Request, Response, NextFunction } from 'express'

import { HttpRequest } from './HttpRequest'
import { Middleware } from './Middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      headers: {
        accessToken: request.headers?.['x-access-token'],
      },
      userId: request.userId,
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode !== 200) {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.error,
      })
    }

    Object.assign(httpRequest, httpResponse.data)
    Object.assign(request, httpResponse.data)

    return next()
  }
}
