import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { ControlContainer, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-widget-code-editor",
  templateUrl: "./code-editor.component.html"
})
export class CodeEditorComponent implements OnInit {
  @Input() formControlName: string;
  public control: AbstractControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn(
          "Missing FormControlName directive from host element of the component"
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  @Input() language: string;
  @Input() code: string;

  editorOptions = { theme: "vs-dark", language: this.language };
}
