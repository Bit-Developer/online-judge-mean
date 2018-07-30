import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/timeout";

@Injectable()
export class TimeoutHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set timeout for each request
    const REQUEST_TIMEOUT = 10000; // 10 seconds
    return next.handle(request).timeout(REQUEST_TIMEOUT);
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
