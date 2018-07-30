import { Component, TemplateRef, OnInit } from "@angular/core";
import { AlertService, UserService } from "./../../services";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { RootComponent } from "../root.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html"
})
export class UsersComponent extends RootComponent {
  modalRef: BsModalRef;
  resetPWdModalRef: BsModalRef;
  users;
  id: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private modalService: BsModalService
  ) {
    super();
  }

  ngOnInit() {
    this.getUsers();
  }
  //Fetch all users
  getUsers() {
    this.userService.getUsers().subscribe(
      data => (this.users = data),
      error => {
        this.handleError(error);
      }
    );
  }

  openModal(template: TemplateRef<any>, id: string) {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }

  confirm(): void {
    this.asyncBegin();
    this.userService.deleteUserById(this.id).subscribe(
      successCode => {
        this.asyncEnd();
        this.alertService.success("User has been deleted successfully.");
        this.getUsers();
        this.modalRef.hide();
      },
      error => {
        this.handleError(error);
        this.modalRef.hide();
      }
    );
  }

  decline(): void {
    this.modalRef.hide();
  }

  openResetPWdModal(template: TemplateRef<any>, id: string) {
    this.id = id;
    this.resetPWdModalRef = this.modalService.show(template, {
      class: "modal-md"
    });
  }

  confirmResetPwd(): void {
    this.asyncBegin();
    this.userService.resetPassword(this.id).subscribe(
      () => {
        this.asyncEnd();
        this.resetPWdModalRef.hide();
        this.alertService.success(
          "User's password has been reset successfully!"
        );
      },
      error => {
        this.handleError(error);
        this.resetPWdModalRef.hide();
      }
    );
  }

  declineResetPwd(): void {
    this.resetPWdModalRef.hide();
  }
}
