import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"

/**
 * Generated class for the HomeworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-homework',
  templateUrl: 'homework.html',
})
export class HomeworkPage {
  title:string;
  homework;
  parentId;
  groupId;

  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,
    public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.homework = this.navParams.data.homework;
    this.parentId=this.navParams.data.parentId;
    this.groupId=this.navParams.data.groupId;
    this.title=this.homework.hName;
  }

  upload(e){
    let type = e.target.files[0].name.split('.')[1];
    if(e.target.files[0]&&this.isHomework(type)){
      const file = e.target.files[0];

      let attach,attachType;

      let formData:FormData = new FormData();
      formData.append('groupId',this.groupId);
      formData.append('parentId',this.parentId);
      formData.append('homeworkId',this.homework.hsId);
      formData.append('attach',"");
      formData.append('attachType',"");
      formData.append('attachName',"");
      formData.append('filedata',file,file.name);
      let loading = this.loadingCtrl.create({
        content: '正在提交...'
      });
      loading.present();
      this.courseService.uploadResourse(formData).subscribe(res =>{
        loading.dismiss();
        attach = res.file[0].id;
        attachType = res.file[0].ext;
        this.submit(this.homework.hsId,attach,attachType,file.name);
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

  submit(homeworkId,attach,attachType,attachName){

    let dData = new URLSearchParams();
    dData.set('groupId',this.groupId);
    dData.set('parentId',this.parentId);
    dData.set('homeworkId',homeworkId);
    dData.set('attach',attach);
    dData.set('attachType',attachType);
    dData.set('attachName',attachName);
    this.courseService.submitHomework(dData.toString()).subscribe(res =>{
        this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          position: 'middle'
        }).present();
    })
    this.homework.hsAttachName=attachName;
  }

}
