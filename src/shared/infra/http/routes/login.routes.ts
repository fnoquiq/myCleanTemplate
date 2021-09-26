import { Router } from 'express'

import { adaptRoute } from '@shared/protocols/infra/AdaptRoute'

import { makeAuthenticateEmployeeController } from '@modules/employees/useCases/authenticateEmployee/AuthenticateEmployeeFactory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeAuthenticateEmployeeController()))
}
