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
export class JwtHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = AuthUtil.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    /*
    return this.http.get(this.baseUrl + `api/profile/read`, {
      headers: { Authorization: `Bearer ${AuthUtils.getToken()}` }
    });*/
    return next.handle(request);
  }
}

/**
 * Provider POJO for the interceptor
 */
export const JwtInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtHttpInterceptor,
  multi: true
};
