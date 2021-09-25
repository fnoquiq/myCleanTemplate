import { CustomHelpers, ErrorReport } from '@hapi/joi'
import { cpf } from 'cpf-cnpj-validator'

const cpfValidator = (value: string, helpers: CustomHelpers): string | ErrorReport => {
  if (cpf.isValid(value)) {
    return value
  }
  return helpers.error('string.cpf', {
    message: 'cpf in invalid',
  })
}

export { cpfValidator }
