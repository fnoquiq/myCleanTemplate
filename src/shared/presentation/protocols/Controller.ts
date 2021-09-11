import { HttpRequest } from '@shared/infra/http/protocols/HttpRequest'
import { HttpResponse } from '@shared/infra/http/protocols/HttpResponse'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
