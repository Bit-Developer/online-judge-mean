import { UserDetails } from "./../models";
import { CookieUtil } from "./cookieutil";
const STORAGE_TOKEN = "storageToken";
const COOKIE_TOKEN = "cookieToken";
const COOKIE_EXPIREDAYS = 1; // Cookie expire days

export class AuthUtil {
  static user: any;
  static token: string;
  static saveToken(token: string, savetocookie?: boolean): void {
    localStorage.setItem(STORAGE_TOKEN, token);
    this.token = token;
    if (savetocookie) {
      CookieUtil.setCookie(COOKIE_TOKEN, token, COOKIE_EXPIREDAYS);
    }
  }

  static getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(STORAGE_TOKEN);
    }
    return this.token;
  }

  static getUserName(): string {
    if (this.user) {
      this.user = this.getUserDetails();
    }
    if (this.user) {
      return this.user.username;
    } else {
      return "";
    }
  }

  static clearToken(): void {
    if (this.token) {
      localStorage.removeItem(STORAGE_TOKEN);
    }
    this.token = "";

    // delete cookie if exits
    CookieUtil.deleteCookie(COOKIE_TOKEN);
  }

  static getUserDetails(): UserDetails {
    let token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  static getCookieToken() {
    return CookieUtil.getCookie(COOKIE_TOKEN);
  }
}
