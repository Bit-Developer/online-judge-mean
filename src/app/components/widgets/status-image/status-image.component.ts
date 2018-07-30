import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-status-image",
  templateUrl: "./status-image.component.html"
})
export class StatusImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() testResult: number;
}
