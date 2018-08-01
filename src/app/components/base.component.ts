import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  QuestionService,
  UserService,
  SubmissionService,
  AlertService,
  AuthenticationService
} from "../services/";

@Injectable()
export abstract class BaseComponent implements OnInit {
  public logging = true;
  public baseForm: FormGroup;
  public loading = false;
  public loading2 = false;
  public submitted = false;

  public initialValidation = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public authService: AuthenticationService,
    public userService: UserService,
    public questionService: QuestionService,
    public submissionService: SubmissionService
  ) {}

  isLoading() {
    return this.loading;
  }
  isLoading2() {
    return this.loading2;
  }

  asyncBegin() {
    this.loading = true;
  }
  asyncEnd() {
    this.loading = false;
  }

  isFieldValid(field: string) {
    //this.printLog(field);
    if (this.baseForm) {
      if (!this.initialValidation) {
        return !this.baseForm.get(field).valid;
      } else {
        return (
          (!this.baseForm.get(field).valid &&
            this.baseForm.get(field).touched) ||
          (this.baseForm.get(field).untouched && this.submitted)
        );
      }
    }
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  ngOnInit() {}

  validate() {
    this.submitted = true;
    if (this.baseForm.invalid) {
      return false; //Validation failed, exit from method.
    }

    this.loading = true;

    return true;
  }

  validate2() {
    this.submitted = true;
    if (this.baseForm.invalid) {
      return false; //Validation failed, exit from method.
    }

    this.loading2 = true;

    return true;
  }

  back(url) {
    this.router.navigate([url]);
  }

  handleSuccess(message: string, keep?: boolean, navURL?: string) {
    this.alertService.success(message, keep);
    if (navURL) {
      this.router.navigate([navURL]);
    }

    this.loading = false;
  }

  handleError(error: string) {
    this.printError(error);
    this.loading = false;
  }

  handleSuccess2(message: string) {
    this.printLog(message);
    this.loading2 = false;
  }

  handleError2(error: string) {
    this.printError(error);
    this.loading2 = false;
  }

  printLog(message: any) {
    if (this.logging) {
      console.log(message);
    }
  }

  printError(message: any) {
    if (this.logging) {
      console.error(message);
    }
  }
}
