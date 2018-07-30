import { Component } from "@angular/core";
import { AbstractControl, Validators } from "@angular/forms";
import { ResetPassword } from "../../models";
import { matchOtherValidator } from "./match-other-validator";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-resetpwd",
  templateUrl: "./resetpwd.component.html"
})
export class ResetpwdComponent extends BaseComponent {
  credentials: ResetPassword = {
    username: "",
    password: "",
    newpwd: "",
    confirmpwd: ""
  };

  ngOnInit() {
    this.initialValidation = true;

    this.baseForm = this.formBuilder.group({
      password: [null, Validators.required],
      newpwd: [null, [Validators.required, Validators.minLength(6)]],
      confirmpwd: [null, [Validators.required, matchOtherValidator("newpwd")]]
    });
  }

  passwordConfirming(ac: AbstractControl): { invalid: boolean } {
    if (ac.get("newpwd").value !== ac.get("confirmpwd").value) {
      return { invalid: true };
    }
  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    let user = this.baseForm.value;
    this.credentials.username = this.authService.getUserDetails().username;
    this.credentials.password = user.password;
    this.credentials.newpwd = user.newpwd;
    this.credentials.confirmpwd = user.confirmpwd;

    this.authService.resetPassword(this.credentials).subscribe(
      () => {
        this.handleSuccess("Password has been updated successful!");
      },
      error => {
        this.handleError(error);
      }
    );
  }
}
