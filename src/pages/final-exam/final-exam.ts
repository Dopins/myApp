import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {TeacherService} from "../../services/httpService/teacher.service";


/**
 * Generated class for the FinalExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-final-exam',
  templateUrl: 'final-exam.html',
})
export class FinalExamPage {
  quizs:any[];
  scoreList:any[];
  sections:any[];
  finalQuizs:any[];
  courseId:string;
  randomNum:number;
  choose: string = "paper";
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  slide:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public teacherService:TeacherService, public toastCtrl: ToastController) {
    this.courseId = navParams.get('id');
    this.formCourseQuiz();
    this.getRandomExam();
    this.listStudentScore();
  }

  formCourseQuiz(){
    let param = {
      courseId : this.courseId
    };
    this.teacherService.formCourseQuiz(param).subscribe( res => {
      if(res.result == "success"){
        this.quizs = res.quiz;
      }
    } , error => {});

  }

  getRandomExam() {
    let param = {
      courseId : this.courseId
    };
    this.teacherService.getRandomExam(param).subscribe( res => {
      if(res.result == "success"){
        this.randomNum = res.randomNum;
      }
    } , error => {});
  }

  setRandomExam() {
    let param = {
      courseId : this.courseId,
      randomNum : this.randomNum
    }
    this.teacherService.setRandomExam(param).subscribe( res => {
      if(res.result == "success"){
        this.toastCtrl.create({
          message: '设置成功',
          duration: 1000,
          position: 'top'
        }).present();
      }
    } , error => {});

  }

  listStudentScore() {
    let param = {
      courseId : this.courseId
    };
    this.teacherService.listStudentScore(param).subscribe( res => {
      if(res.result == "success"){
        this.scoreList = res.scoreList;
        this.sections = res.quizList;
      }
    } , error => {});
  }

  listCourseExams() {
    let param = {
      courseId : this.courseId
    };
    this.teacherService.listCoursRandomExams(param).subscribe( res => {
      if(res.result == "success"){
        this.slide = false;
        this.finalQuizs = res.quiz;
      }
    } , error => {});
  }

  slideReturn() {
    this.slide = true;
  }

  publishExam() {
    let param = {
      publish : 1,
      courseId : this.courseId
    };
    this.teacherService.publishCourseExams(param).subscribe( res => {
      if(res.result == "success"){
        this.toastCtrl.create({
          message: '发布成功',
          duration: 1000,
          position: 'top'
        }).present();
      }
      else{
        this.toastCtrl.create({
          message: '没有需要发布的试题',
          duration: 1000,
          position: 'top'
        }).present();
      }
    } , error => {});
  }

}
