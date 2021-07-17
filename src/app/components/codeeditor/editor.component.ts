import { Component, ViewChild, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html"
})
export class EditorComponent implements OnInit {
  //Create form
  questionForm = new FormGroup({
    title: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    code: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    )
  });

  constructor() {}

  ngOnInit() {}

  @ViewChild("editor") editor;
  text: string = "";

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function(editor) {}
    });
  }

  onSubmit() {
    let question = this.questionForm.value;
    console.log(question);
  }
}
