// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule } from "ngx-bootstrap/alert";
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgProgressModule } from "ngx-progressbar";
import { ɵa } from 'ngx-progressbar/http';
import { MonacoEditorModule } from "ngx-monaco-editor";
import { AngularEditorModule } from '@kolkov/angular-editor';

// components
import {
  AlertComponent,
  ValidationMessageComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  DatabaseComponent,
  QuestionsComponent,
  QuestionComponent,
  UsersComponent,
  UserComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  AlgorithmQuestionComponent,
  AlgorithmQuestionsComponent,
  SubmissionComponent,
  ContextualLabelComponent,
  FrequencyBarComponent,
  LoadingImageComponent,
  LoadingLinkComponent,
  DifficultySelectComponent,
  RoleSelectComponent,
  RatingInputComponent,
  ProgressBarComponent,
  LanguageSelectComponent,
  StatusImageComponent,
  StatusLinkComponent,
  ResultPanelComponent,
  RatingBarComponent
} from "./components/";

// services
import {
  DatabaseService,
  QuestionService,
  UserService,
  AlertService,
  AuthenticationService,
  AuthGuardService,
  SubmissionService
} from "./services/";

// Interceptor
import {
  ErrorInterceptor,
  JwtInterceptor,
  CookieInterceptor,
  TimeoutInterceptor
} from "./interceptor";

// routes
import { appRoutes } from "./app.route";

@NgModule({
  declarations: [
    AlertComponent,
    ValidationMessageComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    DatabaseComponent,
    QuestionsComponent,
    QuestionComponent,
    UsersComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    ResetpwdComponent,
    ProfileComponent,
    ContextualLabelComponent,
    FrequencyBarComponent,
    LoadingImageComponent,
    LoadingLinkComponent,
    AlgorithmQuestionComponent,
    AlgorithmQuestionsComponent,
    SubmissionComponent,
    DifficultySelectComponent,
    RoleSelectComponent,
    RatingInputComponent,
    ProgressBarComponent,
    LanguageSelectComponent,
    StatusImageComponent,
    StatusLinkComponent,
    ResultPanelComponent,
    RatingBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    MonacoEditorModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgProgressModule
  ],
  providers: [
    DatabaseService,
    QuestionService,
    SubmissionService,
    UserService,
    AlertService,
    AuthenticationService,
    AuthGuardService,
    ErrorInterceptor,
    JwtInterceptor,
    CookieInterceptor,
    TimeoutInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: ɵa, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
