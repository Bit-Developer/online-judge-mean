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

import { Question } from "./../models";

@Injectable()
export class QuestionService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/admin/question";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }
  //Create question
  createQuestion(question: Question): Observable<any> {
    return this.http
      .post(this.apiUrl, question, { observe: "response" })
      .map(res => res.status);
  }
  //Fetch question by id
  getQuestionById(pid: string): Observable<Question> {
    return this.http.get<Question>(this.apiUrl + "/" + pid);
  }
  //Update question
  updateQuestion(question: Question): Observable<any> {
    return this.http
      .put(this.apiUrl + "/" + question._id, question, { observe: "response" })
      .map(res => res.status);
  }
  //Delete question
  deleteQuestionById(pid: string): Observable<any> {
    return this.http
      .delete(this.apiUrl + "/" + pid, { observe: "response" })
      .map(res => res.status);
  }
}
