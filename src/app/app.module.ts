// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule, ModalModule } from "ngx-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxEditorModule } from "ngx-editor";
import { NgProgressModule, NgProgressInterceptor } from "ngx-progressbar";
import { MonacoEditorModule } from "ngx-monaco-editor";

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
  EditorComponent,
  UsersComponent,
  UserComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  WysiwygComponent,
  AlgorithmQuestionComponent,
  AlgorithmQuestionsComponent,
  SubmissionComponent,
  ContextualLabelComponent,
  FrequencyBarComponent,
  LoadingImageComponent,
  LoadingLinkComponent,
  DifficultySelectComponent,
  RoleSelectComponent,
  WysiwygEditorComponent,
  CodeEditorComponent,
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
    EditorComponent,
    WysiwygComponent,
    ContextualLabelComponent,
    FrequencyBarComponent,
    LoadingImageComponent,
    LoadingLinkComponent,
    AlgorithmQuestionComponent,
    AlgorithmQuestionsComponent,
    SubmissionComponent,
    DifficultySelectComponent,
    RoleSelectComponent,
    WysiwygEditorComponent,
    CodeEditorComponent,
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
    NgxEditorModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
