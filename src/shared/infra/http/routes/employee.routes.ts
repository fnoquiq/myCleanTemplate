import { Router } from 'express'

import { adaptRoute } from '@shared/infra/http/protocols/AdaptRoute'

import { makeCreateEmployeeController } from '../factories/CreateEmployeeControllerFactory'

export default (router: Router): void => {
  router.post('/employees', adaptRoute(makeCreateEmployeeController()))
}
