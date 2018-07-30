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
}
