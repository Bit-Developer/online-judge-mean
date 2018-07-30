import { Component } from "@angular/core";
import { AuthenticationService } from "./../../services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: "10rem",
    minHeight: "5rem",
    placeholder: "Type something. Test the Editor... ヽ(^。^)丿",
    translate: "no"
  };

  htmlContent = "";
  title = "app";
  constructor(public auth: AuthenticationService) {}
}
