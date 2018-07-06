import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController, AlertController} from 'ionic-angular';
import {CourseService} from "../../services/httpService/course.service";
import {FormPage} from "../form/form";
import { CorrectionPage } from "../correction/correction";
import {CourseSTPage} from '../courseST/courseST';
import {TeacherService} from "../../services/httpService/teacher.service";
import {FileUploadParam} from "../../model/FileUploadParam";
import {ExamPage} from "../exam/exam";
import {FinalExamPage} from "../final-exam/final-exam";
import {VideoPage} from "../video/video";
import {Message} from "../../model/Message";
import {Discuss} from "../../model/Discuss"
import {HttpRequestService} from "../../services/httpService/httpRequest.service";

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
  host:string;
  courseDetail={};
  currentUser:string;
  startDate:string;
  endDate:string;
  courseId:string;
  fileParam:FileUploadParam = new FileUploadParam('','','');
  courseResource:any;
  messageList:Message[];
  homeworkList = new Array();
  discussList:Discuss[] = [];
  sectionNum:number = 0;
  newMessage:Message = new Message('','','','','',false);
  addNewMessage:boolean = false;
  units:any[];
  unitId:number;
  newDiscuss:Discuss = new Discuss('','','','','','','','',0,0,false);
  addNewDiscuss:boolean = false;
  replyList:any[] = [];
  newReply:boolean = true;
  replyContent:string;
  choose: string = "chapter";

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpRequestService:HttpRequestService, public courseService:CourseService,public teacherService:TeacherService,
              public toastCtrl: ToastController, public alertCtrl: AlertController,  public platform: Platform) {
    platform.ready().then(() => {
      this.host =  httpRequestService.getCurrentHost();
      this.courseId = navParams.get('id');
      this.initFileUpload(this.courseId);
    });
  }

  ionViewWillEnter() {
    this.getCourseInfo(this.courseId);
    this.getCourseResource(this.courseId, "teacher");
    this.getDiscussList(this.courseId);
    this.getMessageList(this.courseId);
    this.getUnits();
  }

  openVideoPage(uid){
    this.navCtrl.push(VideoPage,  { id : uid });
  }

  pushExam(id) {
    this.navCtrl.push(ExamPage, { id : id });
  }

  pushForm(formType)
  {
    this.navCtrl.push(FormPage, { id : this.courseId, type : formType, order:this.sectionNum, startDate:this.startDate, endDate:this.endDate });
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
    this.navCtrl.push(FormPage, { sectionId:sectionId, homeworkId:homeworkId, fileParam:this.fileParam, type:'homework', endDate:this.endDate })
  }

  editUnit(sectionId, unitId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, unitId:unitId, fileParam:this.fileParam, type:'unit', startDate:this.startDate, endDate:this.endDate })
  }

  openCorrection(id){
    this.navCtrl.push(CorrectionPage,{id:id,courseId:this.courseId});
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
        let discusses:any = res.discuss;
        this.discussList = [];
        for(let discuss of discusses){
          if(discuss.unitName.length > 5){
            discuss.unitName = discuss.unitName.substr(0,5)+"..";
          }
          let item:Discuss = new Discuss(discuss.id, discuss.creatorId, discuss.creatorName, discuss.createDateString, discuss.content, discuss.photo, discuss.unitId, discuss.unitName, discuss.upvoteCount, discuss.replyCount,false);
          this.discussList.push(item);
        }
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  showReplyList(discuss){
    if(discuss.expand){
      discuss.expand = false;
    }
    else{
      for(let item of this.discussList) {
        if (item.expand) {
          item.expand = false;
        }
      }
      if(discuss.replyCount == 0){
        this.replyList = [];
        discuss.expand = true;
        return;
      }
      this.getReplyList(discuss);
      discuss.expand = true;
    }
  }

  getReplyList(discuss){
      let param = {
        id : discuss.id
      };
      this.replyList = [];
      this.courseService.listReply(param).subscribe( res => {
        if(res.result == "success"){
          this.replyList = res.reply;
          this.currentUser = res.currentUser;
        }
      }, error => {} );
  }

  deleteReply(id,discuss){
    let param = {
      id : id
    };
    this.courseService.deleteReply(param).subscribe(res => {
      if(res.result == "success"){
        this.toastCtrl.create({
          message: '删除成功',
          duration: 1000,
          position: 'top'
        }).present();
        discuss.replyCount -= 1;
        this.getReplyList(discuss);
      }
    }, error => {})
  }

  addReply(){
    this.newReply = false;
  }

  saveReply(discuss){
    let model = {
      id : discuss.id,
      content : this.replyContent
    };
    this.courseService.saveReply(model).subscribe( res => {
      if(res.result == "success"){
        this.newReply = true;
        discuss.replyCount = res.count;
        this.getReplyList(discuss);
      }
    },error => {} );
  }

  closeReply(){
    this.newReply = true;
  }

  addDiscuss(){
    this.newDiscuss.id = '';
    this.newDiscuss.content = '';
    this.unitId = 0;
    this.addNewDiscuss = true;
  }

  closeDiscuss(){
    this.addNewDiscuss = false;
  }

  getUnits(){
    let param = {
      courseId : this.courseId
    };
    this.courseService.getUnits(param).subscribe( res => {
      if(res.result == "success"){
        this.units = res.units;
      }
    }, error => {} )
  }

  saveDiscuss(){
    let model =  {
      discussId : this.newDiscuss.id,
      courseId : this.courseId,
      content : this.newDiscuss.content,
      unitId : this.unitId
    };;
    this.courseService.saveDiscuss(model).subscribe( res =>{
      if(res.result == "success"){
        this.toastCtrl.create({
          message: '保存成功',
          duration: 1000,
          position: 'top'
        }).present();
        this.addNewDiscuss = false;
        this.getDiscussList(this.courseId);
      }
    }, error => {});

  }

  deleteDiscuss(id){
    let param = {
      discussId : id
    };
    this.courseService.deleteDiscuss(param).subscribe( res => {
      if(res.result == "success"){
        this.toastCtrl.create({
          message: '删除成功',
          duration: 1000,
          position: 'top'
        }).present();
        this.getDiscussList(this.courseId);
      }
    }, error => {} );
  }

  editDiscuss(discuss){
    this.newDiscuss = discuss;
    this.unitId = discuss.unitId;
    this.addNewDiscuss = true;
  }

  doUpvote(discuss){
    let paramObj = {
      id:discuss.id
    }
    this.courseService.doUpvote(paramObj).subscribe(res => {
      if(res.result == "success"){
        discuss.upvoteCount = res.count;
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
        this.startDate = res.startDate.split(' ')[0];
        this.endDate = res.endDate.split(' ')[0];
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
    this.messageList = [];
    this.courseService.listMessage(paramObj).subscribe( res => {
      if(res.result=='success') {
        let mList:any[]=res.message;
        for(let message of mList){
          let date = message.createDate.split(' ');
          let createDate = date[0].substr(5)+' '+date[1].substr(0,5);
          let m:Message = new Message(message.id, message.content, message.creatorName, message.photo, createDate,false);
          this.messageList.push(m);
        }
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  saveMessage() {
    let param = {
      messageId : this.newMessage.messageId,
      courseId : this.courseId,
      content : this.newMessage.content
    };
    this.teacherService.saveMessage(param).subscribe( res => {
      if(res.result == 'success'){
        this.addNewMessage = false;
        this.getMessageList(this.courseId);
        this.toastCtrl.create({
          message: '操作完成',
          duration: 1000,
          position: 'top'
        }).present();
      }
    }, error => {} );
  }

  addMessage() {
    this.addNewMessage = true;
  }

  closeAddNew(){
    this.addNewMessage = false;
  }

  expand(message){
    message.expand = true;
  }

  packUp(message){
    message.expand = false;
  }

  editMessage(message) {
    this.addNewMessage = true;
    this.newMessage = message;
  }

  deleteMessage(message) {
    let model = {
      messageId : message.messageId
    };
    this.teacherService.deleteMessage(model).subscribe( res => {
      if(res.result == 'success'){
        this.getMessageList(this.courseId);
        this.toastCtrl.create({
          message: '删除成功',
          duration: 1000,
          position: 'top'
        }).present();
      }
    }, error=>{} )
  }

  getHomeworkList(){
    this.homeworkList = new Array();
    for(let i = 0;i<this.sectionNum;i++){
      let sectionName = this.courseResource[i].name;
      for(let j=0;j<this.courseResource[i].homework.length;j++){
        let homeworkName = this.courseResource[i].homework[j].name;
        let endDate = this.courseResource[i].homework[j].endDate;
        let id = this.courseResource[i].homework[j].id;
        let homework = {
          "sectionName":sectionName,
          "homeworkName":homeworkName,
          "endDate":endDate,
          "id":id
        }
        this.homeworkList.push(homework);
      }
    }
  }

  editStudentAndTeacher(){
      this.navCtrl.push(CourseSTPage,  { courseId: this.courseId });
  }


}
