import { Component, ViewChildren, OnInit } from "@angular/core";
import { TokenPayload } from "../../models";
import { Validators } from "@angular/forms";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html"
})
export class SignupComponent extends BaseComponent {
  credentials: TokenPayload = {
    email: "",
    username: "",
    password: ""
  };

  ngOnInit() {
    this.initialValidation = true;

    this.baseForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]]
    });
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
    this.credentials.email = user.email;
    this.authService.signup(this.credentials, true).subscribe(
      () => {
        this.handleSuccess("Registration successful!", true, "/profile");
      },
      error => {
        this.handleError(error);
      }
    );
  }
}
