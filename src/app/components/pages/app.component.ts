import { Component } from "@angular/core";
import { AuthenticationService } from "./../../services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
}
