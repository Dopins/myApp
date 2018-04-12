import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  quizs:any[];
  sectionName:string;
  correct:string;
  total:string;
  score:string;
  isResult:boolean = false;
  cucumberMap:Map<string,Set<string>> = new Map();
  cucumber:boolean=false;
  sectionId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService, public platform: Platform) {
    platform.ready().then(() => {
      this.sectionId=navParams.data.id;
      this.getQuizResult(navParams.data.ifFin);
    });
  }
  getQuizResult(ifFinished){
    let paramObj = {
      sectionId:this.sectionId
    };
    if(ifFinished == '1'){
        this.showQuizResult();
    }
    else{
      this.courseService.listQuiz(paramObj).subscribe(res => {
        this.quizs = res.quiz;
        this.sectionName = res.sectionName;
      },error => {
        console.log(error);
      });
    }
  }

  showQuizResult(){
    let paramObj = {
      sectionId:this.sectionId
    };
      this.isResult = true;
      this.courseService.listQuizResult(paramObj).subscribe(res => {
      //console.log('quiz:'+res.quiz);
      this.quizs = res.quiz;
      this.sectionName = res.sectionName;
      this.correct = res.correct;
      this.total = res.total;
      this.score = res.score;
       },error => {
        console.log(error);
      });
  }

  updateCucumber(event,quizId,optionId){
    if(event.checked){
      if(this.cucumberMap.has(quizId)){
          let options=this.cucumberMap.get(quizId);
          options.add(optionId);
      }else{
        let options=new Set();
        options.add(optionId);
        this.cucumberMap.set(quizId,options);
      }
    }else{
        let options=this.cucumberMap.get(quizId);
        options.delete(optionId);
    }
  }

  submintQuiz(){
    this.courseService.submitQuiz(this.getQuizAnswer()).subscribe(res => {
      this.showQuizResult();
    }, error => {

    })
  }
  getQuizAnswer(){
    let sectionId = this.navParams.data.id;
    let formData:URLSearchParams = new URLSearchParams();
    formData.append('sectionId',sectionId);
    for(let i=0;i<this.quizs.length;i++){
      formData.append('quiz'+(i+1), this.quizs[i].quizId);
      this.cucumberMap.get(this.quizs[i].quizId).forEach(function (element, index, array) {
        formData.append('option'+(this.quizs[i].quizId),element);
        });
    }
    return formData.toString();
  }

}
