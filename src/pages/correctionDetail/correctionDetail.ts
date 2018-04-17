import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { TeacherService } from "../../services/httpService/teacher.service";

@Component({
  selector: 'page-correctionDetail',
  templateUrl: 'correctionDetail.html',
})

export class CorrectionDetailPage{
    student;
    courseId;
    score:string;
    groupId;
    parentId;
    attach;
    attachType;
    attachName;
    constructor(public navCtrl: NavController,public teacherService:TeacherService, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController){
        this.student = this.navParams.get('student');
        this.courseId = this.navParams.get('courseId');
        this.initFileUpload(this.courseId);
        this.score = this.student.score;
    }

    saveScore(){
        let paramObj = {
            hsId:this.student.id,
            attach:this.student.attach,
            score:this.score,
            comment:this.student.comment
        }
        this.teacherService.saveScore(paramObj).subscribe( res => {
            if(res.result == "success"){
                this.student.score = this.score;
                this.toastCtrl.create({
                    message: '提交成功',
                    duration: 2000,
                    position: 'top'
                }).present();
            }
        })
    }

    removeHomework(){
        let paramObj = {
            id:this.student.id
        }
        this.teacherService.removeHomework(paramObj).subscribe( res => {
            if(res.result == "success"){
                this.student.createDate = "";
                this.toastCtrl.create({
                    message: '操作成功',
                    duration: 2000,
                    position: 'top'
                }).present();
            }
        })
    }

    initFileUpload(cid)
  {
    let paramObj = {
      courseId : cid
    };
    this.teacherService.initFileUpload(paramObj).subscribe( res => {
      if(res.result == 'success'){
          this.groupId = res.groupId;
          this.parentId = res.parentId;
      }
    }, error => {} );
  }

  upload(e){
    let type = e.target.files[0].name.split('.')[1];
    let param = {
        groupId:this.groupId
    }
    if(e.target.files[0]&&this.isHomework(type)){
      const file = e.target.files[0];

      let formData:FormData = new FormData();
      formData.append('filedata',file,file.name);
      let loading = this.loadingCtrl.create({
        content: '正在提交...'
      });
      loading.present();
      this.teacherService.tutorSubmit(param,formData).subscribe(res =>{
        loading.dismiss();
        this.attach = res.file[0].id;
        this.attachType = res.file[0].ext;
        this.attachName = res.file[0].filename;
        this.submit();
      })
    }else{
      this.toastCtrl.create({
          message: "文件类型应为pdf/doc/txt",
          duration: 3000,
          position: 'middle'
        }).present();
    }
  }

  isHomework(type){
    if(type=='pdf'||type=='doc'||type=='docx'||type=='txt'){
      return true
    }else{
      return false;
    }
  }

  submit(){
    let dData = {
      groupId:this.groupId,
      parentId:this.parentId,
      homeworkId:this.student.id,
      attach:this.attach,
      attachType:this.attachType,
      attachName:this.attachName
    }
    this.teacherService.submitHomework(dData).subscribe(res =>{
        this.student.createDate = new Date().toISOString();
        this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          position: 'middle'
        }).present();
    })
  }
}