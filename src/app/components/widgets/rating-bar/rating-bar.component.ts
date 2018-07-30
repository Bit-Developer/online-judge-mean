import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-rating-bar",
  templateUrl: "./rating-bar.component.html"
})
export class RatingBarComponent implements OnInit {
  stars: boolean[] = Array(5).fill(false);

  constructor() {}

  ngOnInit() {
    this.stars = this.stars.map((_, i) => this.rating > i);
  }

  @Input() rating: number;

  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
  }
}
