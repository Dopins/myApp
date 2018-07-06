import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"
import { DetailPage } from "../detail/detail";
import {HttpRequestService} from "../../services/httpService/httpRequest.service";

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
  host:string;
  openSection :Object[];
  courseId: string;
  choose: string = "chapter";
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private httpRequestService:HttpRequestService,public navParams: NavParams,public courseService:CourseService,public alertCtrl: AlertController, public platform: Platform) {
    platform.ready().then(() => {
      this.host =  httpRequestService.getCurrentHost();
      this.courseId = this.navParams.data.id;
      this.getOpenResourse(this.courseId);
    });
  }

  ionViewDidEnter(){
    console.log('view len:'+this.navCtrl.length());
  }

  displayTip(){
    let confirm = this.alertCtrl.create({
      title: '加入学习即可观看视频',
      buttons: [
        {
          text: '确定',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
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
