import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-algorithm-question",
  styleUrls: ["algorithm-question.component.css"],
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent extends BaseComponent {
  editorConfig = {
    editable: false,
    spellcheck: false,
    height: "auto",
    minHeight: "5rem",
    width: "auto",
    minWidth: "0",
    translate: "no",
    enableToolbar: false,
    showToolbar: false,
    placeholder: "Enter text here...",
    imageEndPoint: "",
    toolbar: []
  };

  tab;
  _id;
  username;
  uniquename;
  selectedLang;
  submissions: any = [];
  testResult: number; // -1: not submitted, 10: pass, 20: fail
  resultMessage;
  //Create form
  baseForm = new FormGroup({
    language: new FormControl(
      "javascript",
      Validators.compose([Validators.required])
    ),
    solution1: new FormControl("", Validators.compose([Validators.required])),
    solution2: new FormControl("", Validators.compose([Validators.required])),
    solution3: new FormControl("", Validators.compose([Validators.required])),
    output: new FormControl("", null)
  });

  @Input() sequence: number;
  @Input() title: string;
  @Input() description: string;
  @Input() solution: string;
  @Input() hints: string;
  @Input() options = [];
  options_dev = [
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

  options_prod = [
    {
      value: "javascript",
      name: "JavaScript"
    },
    {
      value: "python",
      name: "Python"
    }
  ];

  editorOptions1 = { theme: "vs-dark", language: "java" };
  editorOptions2 = { theme: "vs-dark", language: "javascript" };
  editorOptions3 = { theme: "vs-dark", language: "python" };
  code1: string = "";
  code2: string = "";
  code3: string = "";
  submitId1: string = "";
  submitId2: string = "";
  submitId3: string = "";

  onChange(language) {
    this.printLog(language);
    this.selectedLang = language;
  }

  changeTab(tab) {
    this.tab = tab;
    this.refresh();
  }

  refresh() {
    if (this.tab === "submissions") {
      this.asyncBegin();
      this.submissionService
        .getSubmissions(this.username, this.uniquename)
        .subscribe(
          data => {
            this.submissions = data;
            this.asyncEnd();
          },
          error => {
            this.handleError(error);
          }
        );
    }
  }

  ngOnInit() {
    console.log("environment", environment);
    if (environment.production) {
      this.options = this.options_prod;
    } else {
      this.options = this.options_dev;
    }
    this.tab = "description";
    this.testResult = -1;
    this.uniquename = this.route.snapshot.paramMap.get("uniquename");
    this.username = this.authService.getUserName();
    if (this.uniquename != null) {
      this.asyncBegin();
      this.submissionService
        .getQuestionByKeys(this.uniquename, this.username)
        .subscribe(
          question => {
            this.printLog(question);
            this.sequence = question.sequence;
            this.title = question.title;
            this.description = question.description;
            this.solution = question.solution;
            this.hints = question.hints;
            this.baseForm.setValue({
              language: "javascript",
              solution1: question.mainfunction,
              solution2: question.jsmain,
              solution3: question.pythonmain,
              output: ""
            });
            this.code1 = question.mainfunction;
            this.code2 = question.jsmain;
            this.code3 = question.pythonmain;
            this.selectedLang = "javascript";
            this.submitId1 = question.id1;
            this.submitId2 = question.id2;
            this.submitId3 = question.id3;
            this.asyncEnd();
          },
          error => {
            this.handleError(error);
          }
        );
    }
  }

  onSave() {
    this.testResult = -1;
    if (!this.validate()) {
      return;
    }

    //Form is valid, now perform create or update
    let question = this.baseForm.value;
    this.printLog(question);

    let id = "";
    let solution = "";
    if (this.selectedLang == "java") {
      id = this.submitId1;
      solution = this.code1;
    } else if (this.selectedLang == "javascript") {
      id = this.submitId2;
      solution = this.code2;
    } else if (this.selectedLang == "python") {
      id = this.submitId3;
      solution = this.code3;
    }
    let submission = new Submission(
      id,
      this.username,
      this.uniquename,
      question.language,
      solution,
      "initial",
      new Date(),
      null,
      0
    );
    this.printLog(submission);

    if (id == null || id == "") {
      //Create question
      this.submissionService.createSubmission(submission).subscribe(
        newsubmission => {
          if (this.selectedLang == "java") {
            this.submitId1 = newsubmission._id;
          } else if (this.selectedLang == "javascript") {
            this.submitId2 = newsubmission._id;
          } else if (this.selectedLang == "python") {
            this.submitId3 = newsubmission._id;
          }
          this.handleSuccess("Your solution has been saved successfully.");
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update question
      this.submissionService.updateSubmission(submission).subscribe(
        updatedsubmission => {
          if (this.selectedLang == "java") {
            this.submitId1 = updatedsubmission._id;
          } else if (this.selectedLang == "javascript") {
            this.submitId2 = updatedsubmission._id;
          } else if (this.selectedLang == "python") {
            this.submitId3 = updatedsubmission._id;
          }
          this.handleSuccess("Your solution has been updated successfully.");
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  onSubmitSolution() {
    this.testResult = -1;
    if (!this.validate2()) {
      return;
    }

    //Form is valid, now perform create or update
    let question = this.baseForm.value;
    this.printLog(question);
    let id = "";
    let solution = "";
    if (this.selectedLang == "java") {
      id = this.submitId1;
      solution = this.code1;
    } else if (this.selectedLang == "javascript") {
      id = this.submitId2;
      solution = this.code2;
    } else if (this.selectedLang == "python") {
      id = this.submitId3;
      solution = this.code3;
    }
    let submission = new Submission(
      id,
      this.username,
      this.uniquename,
      question.language,
      solution,
      "initial",
      new Date(),
      null,
      0
    );
    this.printLog(submission);

    // Submit solution
    this.submissionService.submitSolution(submission).subscribe(
      response => {
        this.printLog(response);
        /*
        this.baseForm.setValue({
          language: submission.language,
          solution: submission.solution,
          output: response.message
          //status: submission.status
        });*/
        if (response.status === "pass") {
          this.handleSuccess2(response.message);
          this.testResult = 10;
          this.resultMessage = response.message;
        } else {
          this.handleError2(response.message);
          this.testResult = 20;
          this.resultMessage = response.message;
        }
        // reset id to null to avoid update
        if (this.selectedLang == "java") {
          this.submitId1 = "";
        } else if (this.selectedLang == "javascript") {
          this.submitId2 = "";
        } else if (this.selectedLang == "python") {
          this.submitId3 = "";
        }
        this.refresh();
      },
      error => {
        this.handleError2(error);
      }
    );
  }
}
