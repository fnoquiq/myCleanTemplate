import { CustomHelpers, ErrorReport } from 'joi'

import cpf from './cpf'

const cpfValidator = (value: string, helpers: CustomHelpers): string | ErrorReport => {
  if (cpf.isValid(value)) {
    return value
  }
  return helpers.error('string.cpf', {
    message: 'cpf is invalid',
  })
}

export { cpfValidator }
