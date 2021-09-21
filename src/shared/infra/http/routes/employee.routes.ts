import { Router } from 'express'

import { adaptRoute } from '@shared/protocols/infra/AdaptRoute'

import { makeCreateEmployeeController } from '@modules/employees/useCases/createEmployee/CreateEmployeeFactory'

export default (router: Router): void => {
  router.post('/employees', adaptRoute(makeCreateEmployeeController()))
}
