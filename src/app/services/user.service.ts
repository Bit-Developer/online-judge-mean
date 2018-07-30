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

import { User } from "./../models";

@Injectable()
export class UserService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/admin/user";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  //Create user
  createUser(user: User): Observable<any> {
    return this.http
      .post(this.apiUrl, user, { observe: "response" })
      .map(res => res.status);
  }
  //Fetch user by id
  getUserById(pid: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/" + pid);
  }
  //Update user
  updateUser(user: User): Observable<any> {
    return this.http
      .put(this.apiUrl + "/" + user._id, user, { observe: "response" })
      .map(res => res.status);
  }
  //Delete user
  deleteUserById(pid: string): Observable<any> {
    return this.http
      .delete(this.apiUrl + "/" + pid, { observe: "response" })
      .map(res => res.status);
  }

  //Reset password
  resetPassword(pid: string): Observable<any> {
    return this.http.patch(
      this.apiUrl + "/reset",
      { id: pid },
      {
        observe: "response"
      }
    );
  }
}
