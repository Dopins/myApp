import { Component } from '@angular/core';
import {  NavController, NavParams,Platform,ToastController, AlertController } from 'ionic-angular';
import { VideoPage } from '../video/video'
import { QuizPage } from '../quiz/quiz'
import { HomeworkPage } from '../homework/homework'
import { CourseService} from "../../services/httpService/course.service"
import {OpenPage} from "../open/open";
import {Message} from "../../model/Message";
import {Discuss} from "../../model/Discuss";
import {HttpRequestService} from "../../services/httpService/httpRequest.service";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  host:string;
  courseDetail={};
  currentUser:string;
  courseResource:Object[];
  discussList:Discuss[] = [];
  messageList:Message[];
  homeworkList:any;
  groupId:string;
  parentId:string;
  courseId;
  units:any[];
  unitId:number;
  newDiscuss:Discuss = new Discuss('','','','','','','','',0,0,false);
  addNewDiscuss:boolean = false;
  replyList:any[] = [];
  newReply:boolean = true;
  replyContent:string;

  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,private httpRequestService:HttpRequestService,
    public toastCtrl: ToastController,public platform: Platform,public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.host =  httpRequestService.getCurrentHost();
      this.courseId = navParams.get('id');
    });
  }

  ionViewWillEnter(){
    this.getCourseInfo(this.courseId);
    this.getCourseResource(this.courseId, "student");
    this.getDiscussList(this.courseId);
    this.getMessageList(this.courseId);
    this.getHomeworkList(this.courseId);
    this.getUnits();
  }

  openHomework(index){
    if(this.homeworkList[index].deadline != "false"){
      this.toastCtrl.create({
          message: '已过提交日期',
          duration: 2000,
          position: 'top'
        }).present();
    }else{
      //let homeworkId:string = this.homeworkList[index].hsId;
      this.navCtrl.push(HomeworkPage,{ homework:this.homeworkList[index],groupId:this.groupId,parentId:this.parentId});
  }
 }

  openHomeworkFromId(id){
  let index;
  console.log(id);
    for(let i=0;i<this.homeworkList.length;i++){
      console.log(this.homeworkList[i].hsId);
      if(this.homeworkList[i].hId==id){
        index=i;
        break;
      }
    }
    this.openHomework(index);
  }


  openVideoPage(uid,name){
    this.navCtrl.push(VideoPage,  { id : uid,name:name });
  }

  IntoQuiz(ifFinished,sectionId){
    this.navCtrl.push(QuizPage, { id: sectionId, ifFin:ifFinished });

  }

  expand(message){
    message.expand = true;
  }

  packUp(message){
    message.expand = false;
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

  getHomeworkList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listSHomework(paramObj).subscribe( res => {
      console.log(res);
      if(res.result=='success') {
        this.homeworkList=res.homeworkList;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      if(res.result=='success'){
        this.courseDetail = res;
        console.log(res);
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
        this.parentId = res.parentId;
        this.groupId = res.groupId;
        //console.log(res);
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

  getDiscussList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listDiscuss(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.currentUser = res.currentUser;
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

  quitOpenCourse(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.quitOpenCourse(paramObj).subscribe( res => {
      console.log(res);
      this.navCtrl.remove(1);
      this.navCtrl.push(OpenPage, { id : cid });
    }, error => {
      console.log("joinOpenCourse error:"+error);
    })
  }

  ifQuitCourse() {
    let confirm = this.alertCtrl.create({
      title: '即将退出此门课程',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.quitOpenCourse(this.navParams.get('id'));
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

}
