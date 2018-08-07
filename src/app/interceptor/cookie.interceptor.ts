import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthUtil } from "../utils";

@Injectable()
export class CookieHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    request = request.clone({
      //withCredentials: true
    });
    return next.handle(request);
  }
}

/**
 * Provider POJO for the interceptor
 */
export const CookieInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: CookieHttpInterceptor,
  multi: true
};
