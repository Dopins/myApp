import { Component } from '@angular/core';
import { NavController,ToastController,Platform,NavParams } from 'ionic-angular';
import { AccountService} from "../../services/httpService/account.service"
import { TeacherService} from "../../services/httpService/teacher.service"

/**
 * Generated class for the CourseCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-student-teacher-form',
  templateUrl: 'courseSTForm.html',
})
export class CourseSTFormPage {

  username:string='';
  name:string='';
  phone:string='';
  email:string='';
  fromDomain:string='';
  fromTeam:string='';
  address:string='';
  teacherType:number=3;
  viewUserInfo:boolean=false;
  addUser:boolean=false;
  addTeacher:boolean=false;
  title:string;
  user:Object;

  account:string;
  courseId:string;
  constructor(public navCtrl: NavController,public accountService:AccountService,public teacherService:TeacherService,
              public toastCtrl: ToastController, public platform: Platform,public navParams: NavParams) {
    platform.ready().then(() => {
        let type=this.navParams.data.type;
        if(type=='viewUserInfo'){
            this.title="账号信息";
            this.account=this.navParams.data.account;
             let paramObj = {
                 account: this.account
              };
             this.accountService.getAccountInfo(paramObj).subscribe( res => {
                  if(res.result=='success') {
                    this.user=res.user;
                    this.viewUserInfo=true;
                  }
                },error=>{
                    console.log("error:"+error);
                });
        }else if(type=='addStudent'){
            this.addUser=true;
            this.title="添加学生";
            this.courseId=this.navParams.data.courseId;
        }else{
            this.addUser=true;
            this.addTeacher=true;
            this.title="添加教师";
            this.courseId=this.navParams.data.courseId;
     }
    });
  }
  ionViewWillEnter(){
  }
  addNewUser(){
    this.username=this.username.replace(/\s+/g,"");
    this.name = this.name.replace(/\s+/g,"");
    if(this.username==''||this.name==''){
      this.toastCtrl.create({
          message: '用户账号和姓名不能为空',
          duration: 2000,
          position: 'mid'
        }).present();
    }else{
        if(this.addTeacher){
           let paramObj = {
                 courseId:this.courseId,
                  account:this.username,
                  name:this.name,
                  phone:this.phone,
                  email:this.email,
                  fromDomain:this.fromDomain,
                  fromTeam:this.fromTeam,
                  address:this.address,
                  teacherType:this.teacherType
              };
           this.teacherService.addNewTeacher(paramObj).subscribe( res => {
                    this.toastCtrl.create({
                      message: res.message,
                      duration: 2000,
                      position: 'mid'
                    }).present();
                },error=>{
                    console.log("error:"+error);
                });
        }else{
           let paramObj = {
                 courseId:this.courseId,
                  account:this.username,
                  name:this.name,
                  phone:this.phone,
                  email:this.email,
                  fromDomain:this.fromDomain,
                  fromTeam:this.fromTeam,
                  address:this.address,
              };
           this.teacherService.addSingleStudent(paramObj).subscribe( res => {
                    this.toastCtrl.create({
                      message: res.message,
                      duration: 2000,
                      position: 'mid'
                    }).present();
                },error=>{
                    console.log("error:"+error);
                });
        }
        this.navCtrl.pop();

    }
  }
}
