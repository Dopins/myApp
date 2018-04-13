import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

import { LoginPage } from '../pages/login/login'
import { CourseCenterPage } from '../pages/course-center/course-center';
import { MinePage } from '../pages/mine/mine';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail'
import { TabsPage } from '../pages/tabs/tabs';
import { VideoPage } from '../pages/video/video'
import { PersonalInfoPage } from '../pages/personalInfo/personalInfo'
import { OpenPage } from '../pages/open/open'
import { QuizPage } from '../pages/quiz/quiz'
import {HomeworkPage}from '../pages/homework/homework'
import { TeacherPage } from '../pages/teacher/teacher'
import { FormPage } from "../pages/form/form";
import { CourseSTPage } from "../pages/courseST/courseST";
import { CourseSTFormPage } from "../pages/courseSTForm/courseSTForm";
import { ExamPage } from "../pages/exam/exam";
import { ChangeHostPage } from "../pages/changeHost/changeHost";

import { BackButtonService } from '../services/uiService/backButton.service';
import { HttpRequestService } from '../services/httpService/httpRequest.service';
import { AccountService } from '../services/httpService/account.service';
import { CourseService } from '../services/httpService/course.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TeacherService} from "../services/httpService/teacher.service";
import {SubjectPage} from "../pages/subject/subject";
import {FinalExamPage} from "../pages/final-exam/final-exam";



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CourseCenterPage,
    MinePage,
    HomePage,
    HomeworkPage,
    PersonalInfoPage,
    DetailPage,
    TabsPage,
    VideoPage,
    OpenPage,
    QuizPage,
    TeacherPage,
    FormPage,
    CourseSTPage,
    CourseSTFormPage,
    ExamPage,
    ChangeHostPage,
    SubjectPage,
    FinalExamPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PdfViewerModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CourseCenterPage,
    PersonalInfoPage,
    MinePage,
    HomePage,
    HomeworkPage,
    DetailPage,
    TabsPage,
    VideoPage,
    OpenPage,
    QuizPage,
    TeacherPage,
    FormPage,
    CourseSTPage,
    CourseSTFormPage,
    ExamPage,
    SubjectPage,
    FinalExamPage,
    ChangeHostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackButtonService,
    HttpRequestService,
    AccountService,
    CourseService,
    TeacherService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
