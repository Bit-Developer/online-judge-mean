import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-status-link",
  templateUrl: "./status-link.component.html",
  styleUrls: ["./status-link.component.css"]
})
export class StatusLinkComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() testResult: string;
  @Input() link: string;

  getLink() {
    return this.link;
  }

  getClass() {
    if (this.testResult === "pass") {
      return "ok";
    } else {
      return "error";
    }
  }

  getText() {
    if (this.testResult === "pass") {
      return "Accepted";
    } else {
      return "Wrong Answer";
    }
  }

  getImageName() {
    if (this.testResult === "pass") {
      return "check.png";
    } else {
      return "cross.png";
    }
  }
}
