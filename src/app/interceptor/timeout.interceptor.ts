import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/timeout";
import { environment } from "../../environments/environment";

@Injectable()
export class TimeoutHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set timeout for each request
    if (environment.http_timeout == 0) {
      return next.handle(request); // no timeout
    } else {
      return next.handle(request).timeout(environment.http_timeout * 1000);
    }
  }
}

/**
 * Provider POJO for the interceptor
 */
export const TimeoutInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TimeoutHttpInterceptor,
  multi: true
};
