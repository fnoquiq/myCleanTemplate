import { HttpRequest } from './HttpRequest'
import { HttpResponse } from './HttpResponse'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
