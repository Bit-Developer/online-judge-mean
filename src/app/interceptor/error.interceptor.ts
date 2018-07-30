import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { _throw } from "rxjs/observable/throw";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { AlertMessage, AlertMessageList } from "./../models";
import { AlertService } from "./../services/";

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  messages: AlertMessageList = new Array();

  /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param request the outgoing HTTP request
     * @param next a HTTP request handler
     */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add a custom header
    const customReq = request.clone({
      //headers: request.headers.set('Content-Type', 'application/json')
    });
    //return next.handle(request);
    return next
      .handle(customReq)
      .do((ev: HttpEvent<any>) => {
        //console.log(customReq);
        if (ev instanceof HttpResponse) {
          //console.error(ev);
          //console.log('processing response', ev);
        }
      })
      .catch(response => {
        console.error(response);
        if (response instanceof HttpErrorResponse) {
          console.log("HttpErrorResponse:" + response.status);
          if (response.status == 422) {
            //console.log("422");
            // 422 error is returned by express-validator
            var errors = response.error.errors;
            console.log(errors);

            // clear
            this.messages.length = 0;
            // build error list
            for (var i = 0; i < errors.length; i++) {
              let am = new AlertMessage("error", errors[i].msg);
              this.messages[i] = am;
            }
            console.log(this.messages);
            this.alertService.error(this.messages);
          } else if (response.status == 401) {
            // 401 Unauthorized
            let message = `${response.message || ""}, ${response.error
              .message}`;
            this.alertService.error(message);
          } else if (response.status < 500 && response.status >= 400) {
            // validation error
            this.alertService.error(response.message);
          } else if (response.status == 500) {
            // internal server error
            let message = `${response.message || ""}: ${response.error
              .message}`;
            this.alertService.error(message);
          } else {
            console.log("else");
            let message = `${response.message || response}`;
            this.alertService.error(message);
          }
        } else {
          this.alertService.error(response.message || response);
        }
        //console.error(respResult.message);
        return _throw(this.messages);
        //return next.handle(request);
      });
  }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHttpInterceptor,
  multi: true
};
