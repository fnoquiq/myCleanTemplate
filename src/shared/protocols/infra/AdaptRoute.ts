import { Request, RequestHandler, Response } from 'express'

import { Controller } from './Controller'
import { HttpRequest } from './HttpRequest'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (request: Request, response: Response) => {
    try {
      const httpRequest: HttpRequest = {
        body: request.body,
        headers: {
          accessToken: request.headers?.['x-access-token'],
        },
        userId: request.userId,
      }

      const httpResponse = await controller.handle(httpRequest)

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        response.status(httpResponse.statusCode).json(httpResponse.data)
      } else {
        response.status(httpResponse.statusCode).json({
          error: httpResponse.error,
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      response.status(500).json({
        error: {
          name: 'InternalServerError',
          message: 'Um erro inesperado aconteceu! Tente novamente!',
        },
      })
    }
  }
}
