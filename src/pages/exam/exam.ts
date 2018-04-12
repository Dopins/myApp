import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { TeacherService } from "../../services/httpService/teacher.service";
import { Quiz } from "../../model/Quiz";
import {Option} from "../../model/Option";
import {SubjectPage} from "../subject/subject";


@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {
  quizs:Quiz[] = [];
  sectionId:string;
  total:number;
  published:string;
  unpublished:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public teacherService:TeacherService, public toastCtrl: ToastController) {
    this.sectionId = this.navParams.get('id');
  }

  ionViewWillEnter()
  {
    this.formQuiz(this.sectionId);
  }

  newSubject(id)
  {
    let order:number = this.total + 1;
    this.navCtrl.push(SubjectPage, { sectionId:this.sectionId, id:id , orderId:order});
  }

  editSubject(quiz)
  {
    this.navCtrl.push(SubjectPage, { quiz : quiz });
  }

  formQuiz(id){
    let param = {
      sectionId : id
    };
    this.quizs = [];
    this.teacherService.formQuiz(param).subscribe( res => {
      let quizArr:any[] = res.quiz;
      this.total = parseInt(res.total);
      this.published = res.published;
      this.unpublished = res.unpublished;
      for(let i = 0;i<quizArr.length;i++){
        let quiz:any = quizArr[i];
        let options:any[] = quiz.options;
        let choice:Option[] = [];
        for(let j = 0;j<options.length;j++){
          let answer:boolean = false;
          if(options[j].answer == 'true'){
            answer = true;
          }
          let option:Option = new Option(options[j].id, options[j].option, answer);
          choice.push(option);
        }
        let temp:Quiz = new Quiz(id, quiz.id, quiz.question, quiz.orderId, choice);
        this.quizs.push(temp);
        // let push:boolean = true;
        // for(let quiz of this.quizs){
        //   if(quiz.quizId == temp.quizId){
        //     push = false;
        //     break;
        //   }
        // }
        // if(push){
        //   this.quizs.push(temp);
        // }
      }
    } , error => {});
  }

  publishQuiz(publishStatus)
  {
    if(this.quizs.length == 0){
      this.toastCtrl.create({
        message: '请先添加题目',
        duration: 1000,
        position: 'top'
      }).present();
      return;
    }
    let param = {
      sectionId : this.sectionId,
      published : publishStatus
    };
    this.teacherService.publishQuiz(param).subscribe( res => {
      if(res.result == "success"){
        this.published = res.published;
        this.unpublished = res.unpublished;
        this.toastCtrl.create({
          message: '修改发布状态成功',
          duration: 1000,
          position: 'top'
        }).present();
      }
    } , error => {});
  }

  deleteQuiz(id)
  {
    let param = {
      quizId : id
    };
    this.teacherService.deleteQuiz(param).subscribe( res => {
        if(res.result == "success"){
          this.published = res.published;
          this.unpublished = res.unpublished;
          this.formQuiz(this.sectionId);
          this.toastCtrl.create({
            message: '删除成功',
            duration: 1000,
            position: 'top'
          }).present();
        }
    } , error =>{})
  }

}
