import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: "app-widget-loading-link",
  templateUrl: "./loading-link.component.html"
})
export class LoadingLinkComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  @Input() loading: boolean;
  @Input() link: string;
  @Input() title: string;
  @Input() inline: boolean;

  getStyle() {
    let style = ``;
    if (this.loading) {
      style = `pointer-events: none; display: inline-block;`;
    }
    console.log("LoadingLinkComponent");
    console.log(this.inline);
    if (this.inline) {
      style += `margin-left: 8px`;
    }
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  getLink() {
    return this.link;
  }
}
