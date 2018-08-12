import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

import {
  User,
  TokenPayload,
  TokenResponse,
  UserDetails,
  ResetPassword
} from "./../models";
import { AuthUtil } from "../utils";

@Injectable()
export class AuthenticationService {
  //URL for CRUD operations
  baseUrl = environment.apiUrl;
  signupUrl = this.baseUrl + "api/authentication/signup";
  loginUrl = this.baseUrl + "api/authentication/login";

  constructor(private http: HttpClient, private router: Router) {}

  public getUserDetails(): UserDetails {
    let token = AuthUtil.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.role === "admin";
    } else {
      return false;
    }
  }

  private request(
    type: "login" | "signup" | "update" | "resetpwd",
    user: TokenPayload,
    refresh: boolean,
    savecookie?: boolean
  ): Observable<any> {
    let base;

    base = this.http.post(this.baseUrl + `api/authentication/${type}`, user);
    console.log(base);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (refresh && data.token) {
          AuthUtil.saveToken(data.token, savecookie);
        }
        return data.token;
      })
    );

    return request;
  }

  public signup(user: TokenPayload, refresh: boolean): Observable<any> {
    return this.request("signup", user, refresh);
  }

  public login(user: TokenPayload, savecookie): Observable<any> {
    return this.request("login", user, true, savecookie);
  }

  public update(user: TokenPayload, refresh: boolean): Observable<any> {
    return this.request("update", user, refresh);
  }

  public resetPassword(user: ResetPassword): Observable<any> {
    return this.request("resetpwd", user, true);
  }

  /*
  public profile(): Observable<any> {
    return this.http.get(this.baseUrl + `api/profile/read`);
  }*/

  public autologin(): Observable<any> {
    let base;
    base = this.http.post(this.baseUrl + `api/authentication/autologin`, "", {
      withCredentials: true // make request send cookie to server
    });
    const request = base.pipe(
      map((data: TokenResponse) => {
        /*
        if (data && data.token) {
          AuthUtil.saveToken(data.token, true);
        }*/
        if (data) {
          return data.token;
        } else {
          return data;
        }
      })
    );

    return request;
  }

  public logout(redirect?): void {
    AuthUtil.clearToken();
    if (redirect) {
      this.http
        .post(this.baseUrl + `api/authentication/logout`, "")
        .subscribe(res => {
          this.router.navigate(["/login"]);
        });
    }
  }

  public getUserName() {
    let userInfo = this.getUserDetails();
    if (userInfo) {
      return userInfo.username;
    } else {
      return "";
    }
  }

  /*
  // Sign up
  signup(user: User): Observable<any> {
    return this.http
      .post(this.signupUrl, user, { observe: "response" })
      .map(res => res.status);
  }

  // Login
  login(username: string, password: string) {
    return this.http
      .post<any>(this.loginUrl, {
        username: username,
        password: password
      })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem("currentUser", JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem("currentUser");
  }*/
}
