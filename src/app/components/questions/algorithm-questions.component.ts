import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "./../../services";

@Component({
  selector: "app-algorithm-questions",
  templateUrl: "./algorithm-questions.component.html"
})
export class AlgorithmQuestionsComponent implements OnInit {
  constructor(private submissionService: SubmissionService) {}
  questions;

  ngOnInit() {
    this.getQuestions();
  }

  //Fetch all questions
  getQuestions() {
    this.submissionService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
