import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-language-select",
  templateUrl: "./language-select.component.html"
})
export class LanguageSelectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() selectedValue: number;

  @Input()
  options = [
    {
      value: "java",
      name: "Java"
    },
    {
      value: "javascript",
      name: "JavaScript"
    },
    {
      value: "python",
      name: "Python"
    }
  ];
}
