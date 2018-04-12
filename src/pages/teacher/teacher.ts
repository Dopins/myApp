import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import {CourseService} from "../../services/httpService/course.service";
import {FormPage} from "../form/form";
import {CourseSTPage} from '../courseST/courseST';
import {TeacherService} from "../../services/httpService/teacher.service";
import {FileUploadParam} from "../../model/FileUploadParam";
import {ExamPage} from "../exam/exam";
import {FinalExamPage} from "../final-exam/final-exam";

/**
 * Generated class for the TeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class TeacherPage {
  courseDetail={};
  courseId:string;
  fileParam:FileUploadParam = new FileUploadParam('','','');
  courseResource:any;
  discussList:any[];
  messageList:Object[];
  homeworkList = new Array();
  progressList:Object[];
  sectionNum:number = 0;


  choose: string = "chapter";

  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,public teacherService:TeacherService, public toastCtrl: ToastController, public alertCtrl: AlertController, public platform: Platform) {
    platform.ready().then(() => {
      this.courseId = navParams.get('id');
      this.initFileUpload(this.courseId);
    });
  }

  ionViewWillEnter() {
    this.getCourseInfo(this.courseId);
    this.getCourseResource(this.courseId, "teacher");
    this.getDiscussList(this.courseId);
    this.getMessageList(this.courseId);
    this.getProgress(this.courseId);
  }

  pushExam(id) {
    this.navCtrl.push(ExamPage, { id : id });
  }

  pushForm(formType)
  {
    this.navCtrl.push(FormPage, { id : this.courseId, type : formType, order:this.sectionNum });
  }

  pushFinalExam()
  {
    this.navCtrl.push(FinalExamPage, { id : this.courseId });
  }

  editSection(id)
  {
    this.navCtrl.push(FormPage, { sectionId : id, id:this.courseId, type : 'section' });
  }

  editHomework(sectionId, homeworkId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, homeworkId:homeworkId, fileParam:this.fileParam, type:'homework' })
  }

  editUnit(sectionId, unitId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, unitId:unitId, fileParam:this.fileParam, type:'unit' })
  }

  deleteSection(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteSection(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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

  deleteUnit(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteUnit(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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

  deleteHomework(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除所有学生上传的作业，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteHomework(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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

  getDiscussList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listDiscuss(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.discussList=res.discuss;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  doUpvote(id){
    let paramObj = {
      id:id
    }
    this.courseService.doUpvote(paramObj).subscribe(res => {
      if(res.result == "success"){
        for(let i =0;i<this.discussList.length;i++){
          if(this.discussList[i].id == id){
            this.discussList[i].id = res.count;
            break;
          }
        }
      }
      else{
        console.log("doUpvote Failed");
      }
    }, error => {
      console.log("error:"+error);
    });
  }

  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      if(res.result=='success'){
        this.courseDetail = res;
      }else{
        this.toastCtrl.create({
          message: '获取课程详情出错',
          duration: 1000,
          position: 'top'
        }).present();
      }
    },error => {
      console.log("error: "+error);
    });
  }

  getCourseResource(cid,type){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseResource(paramObj,type).subscribe(res =>{
      if(res.result=='success'){
        this.courseResource = res.section;
        this.sectionNum = this.courseResource.length;
        this.getHomeworkList();
      }else{
        this.toastCtrl.create({
          message: '获取课程章节出错',
          duration: 1000,
          position: 'top'
        }).present();
      }
    },error => {
      console.log("error: "+error);
    })
  }

  initFileUpload(cid)
  {
    let paramObj = {
      courseId : cid
    };
    this.teacherService.initFileUpload(paramObj).subscribe( res => {
      if(res.result == 'success'){
          this.fileParam = new FileUploadParam(res.coolviewId, res.groupId, res.parentId);
          console.log(this.fileParam);
      }
    }, error => {} );
  }

  getMessageList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listMessage(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.messageList=res.message;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  getHomeworkList(){
    for(let i = 0;i<this.sectionNum;i++){
      let sectionName = this.courseResource[i].name;
      for(let j=0;j<this.courseResource[i].homework.length;j++){
        let homeworkName = this.courseResource[i].homework[j].name;
        let endDate = this.courseResource[i].homework[j].endDate;
        let homework = {
          "sectionName":sectionName,
          "homeworkName":homeworkName,
          "endDate":endDate
        }
        //console.log("sectionName:"+sectionName+" "+"homeworkname:"+homeworkName+" "+"endDate:"+endDate);
        this.homeworkList.push(homework);
      }
    }
  }

  editStudentAndTeacher(){
      this.navCtrl.push(CourseSTPage,  { courseId: this.courseId });
  }

  getProgress(cid){
    let paramObj = {
      courseId: cid
    };
    this.teacherService.listProgress(paramObj).subscribe( res => {
      console.log(res);
      if(res.result == "success")
      {
        this.progressList = res.progress;
      }
      else
      {
        this.toastCtrl.create({
          message: '获取学习进度失败',
          duration: 1000,
          position: 'top'
        }).present();
      }

    }, error => {

    });
  }

}
