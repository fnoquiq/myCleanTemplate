import { Router } from 'express'

import { adaptMiddleware } from '@shared/protocols/infra/AdaptMiddleware'
import { adaptRoute } from '@shared/protocols/infra/AdaptRoute'

import { makeCreateEmployeeController } from '@modules/employees/useCases/createEmployee/CreateEmployeeFactory'

import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory.ts'

export default (router: Router): void => {
  router.post(
    '/employees',
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptRoute(makeCreateEmployeeController())
  )
}
