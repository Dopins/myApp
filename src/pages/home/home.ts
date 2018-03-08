import { Component } from '@angular/core';
import { NavController,ToastController,Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"
import { OpenPage } from  "../open/open"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openItems:Object[];
  constructor(public navCtrl: NavController, public courseService: CourseService,
              public toastCtrl: ToastController, public platform: Platform) {
    platform.ready().then(() => {

    });
  }

  ionViewDidEnter(){
    this.getOpenCourseList();
    console.log('view len:'+this.navCtrl.length());
  }

  getOpenCourseList() {
    this.courseService.listValidCourse().subscribe(res => {
      if (res.result == 'success') {
        console.log(res);
        this.openItems = res.open;
      } else {
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

  pushOpenPage(courseId){
    this.navCtrl.push(OpenPage, { 'id':courseId });
  }
}

