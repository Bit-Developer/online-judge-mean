import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-loading-image",
  templateUrl: "./loading-image.component.html"
})
export class LoadingImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() loading: boolean;
}
