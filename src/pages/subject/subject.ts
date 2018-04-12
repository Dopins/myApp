import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Quiz} from "../../model/Quiz";
import {Option} from "../../model/Option";
import {TeacherService} from "../../services/httpService/teacher.service";

/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {
  subject:Quiz ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public teacherService:TeacherService, public toastCtrl: ToastController) {

    if(typeof (navParams.get("quiz")) == "undefined"){
      let options:Option[] = [];
      let option:Option = new Option('-1','',false);
      let orderId = this.navParams.get("orderId").toString();
      options.push(option);
      this.subject = new Quiz(this.navParams.get('sectionId'), this.navParams.get('id'), '',orderId,options);
    }
    else{
      this.subject = navParams.get("quiz");
    }
    //console.log(this.subject);

  }

  newOption()
  {
    let option:Option = new Option('-1','',false);
    this.subject.options.push(option);
  }

  delOption(index)
  {
    this.subject.options.splice(index,1);
  }

  saveQuiz()
  {
    let param = {
      quiz : JSON.stringify(this.subject)
    };
    console.log(param);
    this.teacherService.saveQuiz(param).subscribe( res => {
      console.log(res);
      if(res.result == 'success'){
        this.toastCtrl.create({
          message: '保存成功',
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    } , error => {});
  }

}
