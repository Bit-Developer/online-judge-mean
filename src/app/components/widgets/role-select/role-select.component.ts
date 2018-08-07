import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-role-select",
  templateUrl: "./role-select.component.html"
})
export class RoleSelectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() selectedValue: number;

  @Input()
  options = [
    {
      value: "Admin",
      name: "Admin"
    },
    {
      value: "Regular",
      name: "Regular"
    }
  ];
}
