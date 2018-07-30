import {
  Component,
  TemplateRef,
  Input,
  ViewChild,
  OnInit
} from "@angular/core";
import {
  AlertService,
  DatabaseService,
  UserService,
  QuestionService,
  SubmissionService
} from "./../../services";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { RootComponent } from "../root.component";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html"
})
export class DatabaseComponent extends RootComponent {
  modalRef: BsModalRef;
  uploadForm: FormGroup;
  selectedValue: string;
  collection: string;
  users;
  questions;
  submissions;

  constructor(
    public formBuilder: FormBuilder,
    private databaseSerivce: DatabaseService,
    private userService: UserService,
    private questionService: QuestionService,
    private submissionService: SubmissionService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {
    super();
  }

  @Input() options = [];
  @ViewChild("fileupd") fileupd;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      fileupd: []
    });
    this.asyncBegin();
    this.databaseSerivce.getCollections().subscribe(
      collections => {
        let list = [{ value: "noselect", name: "--No Selection--" }];
        let names = collections.map(val => ({
          value: val.name,
          name: val.name
        }));
        this.options = list.concat(names);
        this.selectedValue = "noselect";
        this.collection = this.selectedValue;
        this.asyncEnd();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  onChange(collection) {
    this.printLog(collection);
    this.getData(collection);
  }

  refresh() {
    this.getData(this.collection);
  }

  getData(collection) {
    this.asyncBegin();
    if (collection == "users") {
      this.databaseSerivce.getUsers(collection).subscribe(
        data => {
          this.users = data;
          this.collection = collection;
          this.asyncEnd();
        },
        error => {
          this.handleError(error);
        }
      );
    } else if (collection == "questions") {
      this.databaseSerivce.getQuestions(collection).subscribe(
        data => {
          this.questions = data;
          this.collection = collection;
          this.asyncEnd();
        },
        error => {
          this.handleError(error);
        }
      );
    } else if (collection == "submissions") {
      this.databaseSerivce.getSubmissions(collection).subscribe(
        data => {
          this.submissions = data;
          this.collection = collection;
          this.asyncEnd();
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      this.collection = "noselect";
    }
  }

  exportCSV() {
    this.asyncBegin();
    this.databaseSerivce.exportData(this.collection).subscribe(
      res => {
        let options = { type: "text/csv;charset=utf-8;" };
        this.databaseSerivce.createAndDownloadBlobFile(
          res.data,
          options,
          res.filename
        );
        this.asyncEnd();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  hasData() {
    if (
      this.collection == "users" ||
      this.collection == "questions" ||
      this.collection == "submissions"
    ) {
      return true;
    } else {
      return false;
    }
  }

  // upload dialog
  openModal(template: TemplateRef<any>, id: string) {
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }
  choose() {
    var filectrl = <HTMLInputElement>document.getElementById("upload");
    filectrl.value = "";
    filectrl.click();
  }

  loading: boolean = false;
  confirm(): void {
    if (!this.fileToUpload) {
      alert("No file has been selected!");
      return;
    }
    const formData = new FormData();
    // 'fileitem' must match with the backen api
    formData.append("fileitem", this.fileToUpload, this.fileToUpload.name); // file
    formData.append("name", this.collection); // collection name: users, questions.

    this.asyncBegin();
    this.databaseSerivce.importData(formData).subscribe(
      data => {
        this.alertService.success(
          this.collection + " have been successfully uploaded. "
        );
        this.asyncEnd();
        this.clearFile();
        this.getData(this.collection);
        this.modalRef.hide();
      },
      error => {
        this.handleError(error);
        this.clearFile();
        this.modalRef.hide();
      }
    );
  }

  decline(): void {
    this.modalRef.hide();
    this.clearFile();
  }

  //upload file
  fileToUpload: File = null;
  filename: String = "";
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.filename = this.fileToUpload.name;
      this.printLog(this.fileToUpload);
    }
  }

  clearFile() {
    var filectrl = <HTMLInputElement>document.getElementById("upload");
    filectrl.value = "";
    this.fileToUpload = null;
    this.filename = "";
  }

  delete(name, id) {
    this.asyncBegin();
    if (name == "users") {
      this.userService.deleteUserById(id).subscribe(
        successCode => {
          this.asyncEnd();
          this.alertService.success("User has been deleted successfully.");
          this.getData(name);
        },
        error => {
          this.handleError(error);
        }
      );
    } else if (name == "questions") {
      this.questionService.deleteQuestionById(id).subscribe(
        successCode => {
          this.asyncEnd();
          this.alertService.success("Question has been deleted successfully.");
          this.getData(name);
        },
        error => {
          this.handleError(error);
        }
      );
    } else if (name == "submissions") {
      this.submissionService.deleteSubmissionById(id).subscribe(
        successCode => {
          this.asyncEnd();
          this.alertService.success(
            "Submission has been deleted successfully."
          );
          this.getData(name);
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }
}
