import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"
import { DetailPage } from "../detail/detail";

/**
 * Generated class for the OpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {
  openCourse ={};
  openSection :Object[];
  courseId: string;
  choose: string = "chapter";
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams,public courseService:CourseService,public platform: Platform) {
    platform.ready().then(() => {
      this.courseId = this.navParams.data.id;
      this.getOpenResourse(this.courseId);
    });
  }

  ionViewDidEnter(){
    console.log('view len:'+this.navCtrl.length());
  }

  getOpenResourse(id){
    let paramObj = {
      courseId:id
    };
    this.courseService.openCourseResource(paramObj).subscribe( res => {
      //console.log(res);
      this.openCourse = res.course;
      this.openSection = res.section;
    }, error => {
      console.log("getOpenCourseResource error:"+error);
    })
  }

  joinOpenCourse(id){
    let paramObj = {
      courseId:id
    };
    this.courseService.joinOpenCourse(paramObj).subscribe( res => {
      console.log(res);
      this.navCtrl.remove(1);
      this.navCtrl.push(DetailPage,  { id: id ,type:'student'});
      // let modal = this.modalCtrl.create(DetailPage,  { id: id ,type:'student'});
      // modal.present();
    }, error => {
      console.log("joinOpenCourse error:"+error);
    })
  }

}
