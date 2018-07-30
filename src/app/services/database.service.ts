import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  URLSearchParams,
  RequestOptions,
  ResponseContentType,
  RequestMethod
} from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Question, User, Submission, Collection } from "./../models";

@Injectable()
export class DatabaseService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/admin/database";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all questions
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl + "/collections");
  }
  //Fetch all users
  getUsers(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/collections/" + name);
  }
  //Fetch all questions
  getQuestions(name: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl + "/collections/" + name);
  }
  // Fetch all submissions
  getSubmissions(name: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.apiUrl + "/collections/" + name);
  }
  // Export data
  exportData(name: string) {
    return this.http
      .get(this.apiUrl + "/export/" + name, {
        responseType: "blob",
        observe: "response" // to display the full response
      })
      .map(res => {
        return {
          //response: res,
          filename: name + ".csv", //res.headers.get("filename");
          data: res.body
        };
      });
    /*
      .subscribe(res => ({
        content: res.body,
        fileName: res.headers.get("content-filename")
      }));*/
  }

  createAndDownloadBlobFile(body, options, filename) {
    console.log("createAndDownloadBlobFile");
    var blob = new Blob([body], options);
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  importData(formData: any) {
    console.log(formData);
    return this.http.post(this.apiUrl + "/import", formData, {
      observe: "response"
    });
  }
}
