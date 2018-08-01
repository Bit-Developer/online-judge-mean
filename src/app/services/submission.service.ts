import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  URLSearchParams,
  RequestOptions
} from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

import { QuestionExt, Submission } from "./../models";

@Injectable()
export class SubmissionService {
  baseUrl = environment.apiUrl;
  apiUrl = this.baseUrl + "api/submission";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}

  //Fetch all questions
  getQuestions(): Observable<QuestionExt[]> {
    return this.http.get<QuestionExt[]>(this.apiUrl + "/questions");
  }
  //Fetch question by unique name
  getQuestionByKeys(qname: string, uname: string): Observable<QuestionExt> {
    return this.http.get<QuestionExt>(
      this.apiUrl + "/question/" + qname + "," + uname
    );
  }

  //Create submission
  createSubmission(submission: Submission): Observable<any> {
    return this.http
      .post<Submission>(this.apiUrl, submission, {
        observe: "response"
      })
      .map(res => res.body);
  }

  //Update submission
  updateSubmission(submission: Submission): Observable<any> {
    return this.http
      .put<Submission>(this.apiUrl + "/" + submission._id, submission, {
        observe: "response"
      })
      .map(res => res.body);
  }

  //Delete submission
  deleteSubmissionById(pid: string): Observable<any> {
    return this.http
      .delete(this.apiUrl + "/" + pid, { observe: "response" })
      .map(res => res.status);
  }

  //Fetch submission by names
  getSubmissionByKeys(
    username: string,
    questionname: string,
    language: string
  ): Observable<Submission> {
    return this.http.get<Submission>(
      this.apiUrl + "/one/" + username + "," + questionname + "," + language
    );
  }

  // Fetch all submissions by names
  getSubmissions(
    username: string,
    questionname: string
  ): Observable<Submission[]> {
    return this.http.get<Submission[]>(
      this.apiUrl + "/all/" + username + "," + questionname
    );
  }

  //Submit solution
  submitSolution(submission: Submission): Observable<any> {
    return this.http.post(this.apiUrl + "/run", submission);
  }
}
