import { Component } from '@angular/core';
import { NavController,ToastController,Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { TeacherPage } from '../teacher/teacher'
import { CourseService} from "../../services/httpService/course.service"
import {FormPage} from "../form/form";

/**
 * Generated class for the CourseCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-center',
  templateUrl: 'course-center.html',
})
export class CourseCenterPage {

  segment: string = "study";
  studyItems:Object[];
  teachItems:Object[];
  constructor(public navCtrl: NavController, public courseService:CourseService,
              public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    platform.ready().then(() => {

    });
  }

  ionViewWillEnter(){
    this.getAllCourseList();
  }

  createCourse() {
    this.navCtrl.push(FormPage, { type : 'course' });
  }

  presentActionSheet(e, id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deleteCourse(id);
          }
        }, {
          text: '复制',
          icon: !this.platform.is('ios') ? 'copy' : null,
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteCourse(id) {
    let model = {
      courseId : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.courseService.deleteCourse(model).subscribe( res => {
              if(res.result == 'success') {
                this.getAllCourseList();
                this.toastCtrl.create({
                  message: '删除成功',
                  duration: 1000,
                  position: 'top'
                }).present();
              }
            } , error => {})
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  openDetailPageOfStu(id){
    this.navCtrl.push(DetailPage,  { id: id });
  }

  openTeacherPage(id){
    this.navCtrl.push(TeacherPage,  { id: id });
  }

  getAllCourseList(){
    this.courseService.listValidCourse().subscribe(res => {
      if(res.result=='success'){
        this.studyItems=res.student;
        this.teachItems=res.teacher;
      }else{
        this.toastCtrl.create({
          message: '获取课程列表出错',
          duration: 2000,
          position: 'top'
        }).present();
      }
    }, error => {
      this.toastCtrl.create({
        message: '网络请求出错',
        duration: 2000,
        position: 'top'
      }).present();
      console.log(error);
    });

  }

}
