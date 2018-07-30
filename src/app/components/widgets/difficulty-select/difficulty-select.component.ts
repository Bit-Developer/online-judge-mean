import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-difficulty-select",
  templateUrl: "./difficulty-select.component.html"
})
export class DifficultySelectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() selectedValue: number;

  @Input()
  options = [
    {
      value: 10,
      name: "Easy"
    },
    {
      value: 20,
      name: "Medium"
    },
    {
      value: 30,
      name: "Hard"
    }
  ];
}
