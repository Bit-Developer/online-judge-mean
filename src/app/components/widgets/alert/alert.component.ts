import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { AlertService } from "../../../services";
import { AlertMessageList } from "../../../models";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html"
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  messages: AlertMessageList;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(messages => {
      //console.log("messages");
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
