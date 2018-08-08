import { Component } from "@angular/core";
import { TokenPayload } from "../../models";
import { Validators } from "@angular/forms";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html"
})
export class UserComponent extends BaseComponent {
  _id;
  public selectedRole;
  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    role: "",
    _id: ""
  };

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    if (this._id == null || this._id == "") {
      this.initialValidation = true;
      this.selectedRole = "regular";
      // create
      this.baseForm = this.formBuilder.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required, Validators.email]],
        role: []
      });
    } else {
      this.baseForm = this.formBuilder.group({
        _id: [],
        username: [],
        email: [],
        role: []
      });

      this.userService.getUserById(this._id).subscribe(
        user => {
          this.baseForm = this.formBuilder.group({
            _id: [user._id, [Validators.required]],
            username: [
              user.username,
              [Validators.required, Validators.minLength(3)]
            ],
            email: [user.email, [Validators.required, Validators.email]],
            role: [user.role, []]
          });

          this.baseForm.setValue({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          });
          this.selectedRole = user.role;
        },
        error => {
          this.printError(error);
        }
      );
    }
  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    let user = this.baseForm.value;
    console.log(user);
    if (user._id == null || user._id == "") {
      //Create user
      console.log("Create user:" + this._id);
      this.credentials._id = "";
      this.credentials.username = user.username;
      this.credentials.password = user.password;
      this.credentials.email = user.email;
      this.credentials.role = this.selectedRole;
      this.authService.signup(this.credentials, false).subscribe(
        () => {
          this.handleSuccess(
            "User has been created successfully!",
            true,
            "/admin/users"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update user
      this.credentials._id = user._id;
      this.credentials.username = user.username;
      this.credentials.email = user.email;
      this.credentials.role = user.role;
      this.authService.update(this.credentials, false).subscribe(
        () => {
          this.handleSuccess(
            "User has been updated successfully!",
            true,
            "/admin/users"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }
}
