import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AlertMessage, AlertMessageList } from "../models";

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  alertMessage: AlertMessage = {
    type: "",
    text: ""
  };

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(
    message: string | AlertMessageList,
    keepAfterNavigationChange = false
  ) {
    //console.log("alert.server.success()");
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: "success", text: message });
    if (message instanceof Array) {
      this.subject.next(message);
    } else {
      this.alertMessage.type = "success";
      this.alertMessage.text = message;
      this.subject.next([this.alertMessage]);
    }
  }

  error(
    messages: string | AlertMessageList,
    keepAfterNavigationChange = false
  ) {
    //console.log("alert.server.error()");
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (messages instanceof Array) {
      this.subject.next(messages);
    } else {
      this.alertMessage.type = "error";
      this.alertMessage.text = messages;
      this.subject.next([this.alertMessage]);
    }
  }

  getMessage(): Observable<any> {
    //console.log("alert.server.getMessage()");
    return this.subject.asObservable();
  }
}
