import { RouterModule, Routes } from "@angular/router";

// components
import {
  AlertComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  DatabaseComponent,
  QuestionsComponent,
  QuestionComponent,
  EditorComponent,
  UsersComponent,
  UserComponent,
  WysiwygComponent,
  AlgorithmQuestionComponent,
  AlgorithmQuestionsComponent,
  SubmissionComponent
} from "./components/";

// services
import { AuthGuardService } from "./services/";

export const appRoutes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "questions", component: AlgorithmQuestionsComponent },
  { path: "question/:uniquename", component: AlgorithmQuestionComponent },
  { path: "submission/:id", component: SubmissionComponent },
  {
    path: "admin/database",
    component: DatabaseComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/users",
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/user",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/user/:_id",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/questions",
    component: QuestionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/question",
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/question/:_id",
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "editor",
    component: EditorComponent
  },
  {
    path: "wysiwyg",
    component: WysiwygComponent
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "resetpwd",
    component: ResetpwdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];
