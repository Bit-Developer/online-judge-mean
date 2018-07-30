import { Component, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { Validators } from "@angular/forms";
import { TokenPayload } from "../../models";
import { CookieUtil, AuthUtil } from "../../utils";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent extends BaseComponent {
  credentials: TokenPayload = {
    username: "",
    password: "",
    remember: false
  };

  returnUrl: string;

  ngOnInit() {
    this.initialValidation = true;

    this.baseForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      remember: [null, []]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    // auto login with cookie
    const cookieToken = AuthUtil.getCookieToken();
    this.printLog(cookieToken);

    if (cookieToken) {
      this.authService.autologin().subscribe(
        () => {
          //this.alertService.success("Login successful!", true);
          this.printLog(document.cookie);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.printError(err);
          // reset login status
          this.authService.logout(false);
        }
      );
    } else {
      // reset login status
      this.authService.logout(false);
    }
  }

  @ViewChildren("username") inputUserName;
  ngAfterViewInit() {
    this.inputUserName.first.nativeElement.focus();
  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    let user = this.baseForm.value;
    this.credentials.username = user.username;
    this.credentials.password = user.password;
    this.credentials.remember = user.remember;

    this.printLog(this.credentials);
    this.printLog("Your Cookie : " + document.cookie);

    this.authService.login(this.credentials, user.remember).subscribe(
      () => {
        this.handleSuccess("Login successful!", true, this.returnUrl);
      },
      error => {
        this.handleError(error);
      }
    );
  }
}
