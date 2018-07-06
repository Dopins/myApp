import { Component } from '@angular/core';
import { NavParams,ToastController} from 'ionic-angular';
import { AccountService} from "../../services/httpService/account.service"
import { HttpRequestService} from "../../services/httpService/httpRequest.service"

@Component({
  selector: 'page-personalInfo',
  templateUrl: 'personalInfo.html'
})
export class PersonalInfoPage {
  userInfo;
  photo:string='';
  password:string="";
  confirmPassword:string="";
  constructor(public accountService:AccountService,
              public httpRequestService:HttpRequestService,
              public toastCtrl:ToastController,
              public navParams: NavParams) {
    this.userInfo=this.navParams.data;
    this.photo=this.userInfo.photo;
    this.userInfo.photo = httpRequestService.getCurrentHost()+"/lms/custom/"+this.userInfo.photo;
  }

  imageUploaded(event) {
    let file = event.target.files[0];
    let arr = file.name.split('.');
    let type = arr[arr.length-1];
    if (type !='jpeg' && type != 'jpg' && type != 'png' && type != 'gif') {
      this.toastCtrl.create({
        message: "请上传jpg,jpeg,png或gif格式的图片",
        duration: 2000,
        position: 'middle'
      }).present();
      return;
    }
    var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(file); //读取为base64
    var that = this;
    reader.onloadend = function (e) {
      that.userInfo.photo = reader.result;
      that.accountService.upload(file).subscribe( res => {
        if(res.result == 'success')
        {
          that.photo=res.file[0].id;
          that.userInfo.filename = res.file[0].id;
        }
      }, error => {
      });
    }
  }

  change(){
    if(this.password!=this.confirmPassword){
      this.toastCtrl.create({
        message: '两次输入密码不一致',
        duration: 2000,
        position: 'middle'
      }).present();
    }else{
      let paramObj={
        name:this.userInfo.name,
        filename:this.photo,
        email:this.userInfo.email,
        telephone:this.userInfo.phone,
        address:this.userInfo.address,
        introduction:this.userInfo.introduction,
        password:this.password,
        confirmPassword:this.confirmPassword
      }
      this.accountService.saveAccount(this.httpRequestService.serialize(paramObj)).subscribe(res=>{
        if(res.result="success"){
          this.toastCtrl.create({
            message: '修改成功',
            duration: 2000,
            position: 'middle'
          }).present();
        }
      },error=>{
        console.log("error:"+error);
      });
    }
  }

}
