import { Router } from 'express'

import { adaptRoute } from '@shared/protocols/infra/AdaptRoute'

import { makeAuthenticateEmployeeController } from '@modules/employees/useCases/factories/AuthenticateEmployeeFactory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeAuthenticateEmployeeController()))
}
