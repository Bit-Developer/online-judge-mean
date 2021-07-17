import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html"
})
export class FooterComponent implements OnInit {
  currentYear: number;
  constructor() {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
