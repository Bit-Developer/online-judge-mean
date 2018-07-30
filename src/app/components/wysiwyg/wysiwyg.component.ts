import { Component, OnInit } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-wysiwyg",
  templateUrl: "./wysiwyg.component.html",
  styleUrls: ["./wysiwyg.component.css"]
})
export class WysiwygComponent implements OnInit {
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: "10rem",
    minHeight: "5rem",
    placeholder: "Type something. Test the Editor... ヽ(^。^)丿",
    translate: "no"
  };

  htmlContent = "";

  //Create form
  questionForm = new FormGroup({
    title: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    description: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    )
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    let question = this.questionForm.value;
    console.log(question);
  }
}
