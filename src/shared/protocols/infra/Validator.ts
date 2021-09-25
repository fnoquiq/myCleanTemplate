import Joi from '@hapi/joi'

import { ValidationError } from '@shared/errors/ValidationError'

import { Either, left, right } from '../logic/Either'
import { HttpRequest } from './HttpRequest'

export class Validator<T> {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  public validate(httpRequest: HttpRequest): Either<ValidationError, T> {
    const { error, value } = this.schema.validate(httpRequest)

    if (error) {
      return left(new ValidationError(error.details))
    }
    return right(value)
  }
}
