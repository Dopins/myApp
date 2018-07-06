import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { TeacherService } from "../../services/httpService/teacher.service";
import { CourseService} from "../../services/httpService/course.service"

@Component({
  selector: 'page-correctionPerson',
  templateUrl: 'correctionPerson.html',
})

export class CorrectionPersonPage{
    student;
    index;
    constructor(public navCtrl: NavController,public teacherService:TeacherService,public courseService:CourseService, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController){
        this.student = this.navParams.get('student');
        this.index = this.navParams.get('index');
    }
}