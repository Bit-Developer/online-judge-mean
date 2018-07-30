import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-widget-validation-message",
  templateUrl: "./validation-message.component.html",
  styleUrls: ["./validation-message.component.css"]
})
export class ValidationMessageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
