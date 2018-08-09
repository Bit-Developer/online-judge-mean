import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-submission",
  styleUrls: ["submission.component.css"],
  templateUrl: "./submission.component.html"
})
export class SubmissionComponent extends BaseComponent {
  id;
  questionname;
  language;
  timesubmitted;
  status;

  editorOptions1 = { theme: "vs", language: "java", readOnly: true };
  code1: string = "";

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("submission id:", this.id);
    if (this.id != null) {
      this.asyncBegin();
      this.submissionService.getSubmissionById(this.id).subscribe(
        submission => {
          this.printLog(submission);
          this.questionname = submission.questionname;
          this.language = submission.language;
          this.timesubmitted = submission.timesubmitted;
          this.status = submission.status;
          this.code1 = submission.solution;
          // check editor language
          this.editorOptions1 = Object.assign({}, this.editorOptions1, {
            language: submission.language
          });
          this.asyncEnd();
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  getQuestionName() {
    if (!this.questionname) {
      return "";
    }

    const names = this.questionname.split("-");
    //console.log("names:", names);
    let result = [];
    for (let i = 0; i < names.length; i++) {
      result.push(names[i].charAt(0).toUpperCase() + names[i].substr(1));
    }
    return result.join(" ");
  }
}
