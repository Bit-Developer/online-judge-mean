import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserDetails } from "../../models";
import { AuthenticationService } from "../../services";
import { AuthUtil } from "../../utils";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {}
}
