import { Component } from '@angular/core';
import { NavController,ToastController,Platform,NavParams } from 'ionic-angular';
import { TeacherService} from "../../services/httpService/teacher.service"
import { CourseSTFormPage } from "../courseSTForm/courseSTForm";

/**
 * Generated class for the CourseCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-student-teacher',
  templateUrl: 'courseST.html',
})
export class CourseSTPage {

  segment: string = "student";
  studentItems:Object[];
  teacherItems:Object[];
  courseId:string;
  checkedStudent:Set<string>=new Set();
  checkedTeacher:Set<string>=new Set();
  constructor(public navCtrl: NavController, public teacherService:TeacherService,
              public toastCtrl: ToastController, public platform: Platform,public navParams: NavParams) {
    platform.ready().then(() => {
        this.courseId=this.navParams.data.courseId;
    });
  }

  ionViewWillEnter(){
    this.cleanCkeckedSet();
    this.getCourseStudent();
    this.getCourseTeacher();
  }

  addUser(type){
    this.navCtrl.push(CourseSTFormPage,  { courseId:this.courseId,type: type });
  }

  openUserInfoPage(account){
    this.navCtrl.push(CourseSTFormPage,  { type: 'viewUserInfo',account:account });
  }
  getCourseStudent(){
    let paramObj = {
      courseId: this.courseId
    };
    this.teacherService.getCourseStudent(paramObj).subscribe(res => {
      if(res.result=='success'){
        this.studentItems=res.student;
      }else{
        this.toastCtrl.create({
          message: '获取学生列表出错',
          duration: 2000,
          position: 'top'
        }).present();
      }
    }, error => {
      console.log(error);
    });
  }
  getCourseTeacher(){
    let paramObj = {
      courseId: this.courseId
    };
    this.teacherService.getCourseTeacher(paramObj).subscribe(res => {
      if(res.result=='success'){
        this.teacherItems=res.teacher;
      }else{
        this.toastCtrl.create({
          message: '获取教师列表出错',
          duration: 2000,
          position: 'top'
        }).present();
      }
    }, error => {
      console.log(error);
    });
  }

  updateCucumber(event,type,account){
    if(event.checked){
      if(type=='student'){
          this.checkedStudent.add(account);
      }else{
          this.checkedTeacher.add(account);
      }
    }else{
      if(type=='student'){
          this.checkedStudent.delete(account);
      }else{
          this.checkedTeacher.delete(account);
      }
    }
  }

  removeSelectedStudent(){
    if(this.checkedStudent.size==0){
      return;
    }
    let ids:string='';
    this.checkedStudent.forEach(function (element, index, array) {
      ids+=(element+';');
    });
    let paramObj={
      selectId:ids
    }
      this.teacherService.removeStudent(paramObj).subscribe(res => {
        this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          position: 'bottom'
        }).present();
        if(res.result=='success'){
            this.getCourseStudent();
        }
      },error => {
        console.log(error);
      });
  }
  removeSelectedTeacher(){
    if(this.checkedTeacher.size==0){
      return;
    }
    let ids:string='';
    this.checkedTeacher.forEach(function (element, index, array) {
      ids+=(element+';');
    });
    let paramObj={
      courseId:this.courseId,
      teacherId:ids
    }
      this.teacherService.removeTeacher(paramObj).subscribe(res => {
        this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          position: 'bottom'
        }).present();
        if(res.result=='success'){
            this.getCourseTeacher();
        }
      },error => {
        console.log(error);
      });
  }
  cleanCkeckedSet(){
    this.checkedStudent.clear();
    this.checkedTeacher.clear();
  }

}
