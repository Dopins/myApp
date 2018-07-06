import { Component } from '@angular/core';
import { NavController, ModalController,ToastController,Platform,AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { AccountService} from "../../services/httpService/account.service"
import {PersonalInfoPage} from "../personalInfo/personalInfo";

import { NativeStorage } from '@ionic-native/native-storage';
import {HttpRequestService} from "../../services/httpService/httpRequest.service";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userInfo:any;
  photo:string;
  host:string;
  constructor(public nativeStorage: NativeStorage,public navCtrl: NavController,public modalCtrl: ModalController,public toastCtrl: ToastController,public accountService:AccountService,
              private httpRequestService:HttpRequestService, public platform: Platform,public alertCtrl: AlertController) {
      this.host = httpRequestService.getCurrentHost();
  }
  ionViewWillEnter(){
    this.getUserInfo();
  }
  getUserInfo() {
    this.accountService.getUserInfo().subscribe(res=>{
      this.userInfo=res;
      this.photo = this.host + "/lms/custom/"+this.userInfo.photo;
    },error=>{
      console.log("error:"+error);
    })
  }

  changePersonalInfo(){
    this.navCtrl.push(PersonalInfoPage,  this.userInfo );
  }

  confirmLogout(){
     let confirm = this.alertCtrl.create({
      title: '确认退出登录吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.logout();
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
  logout() {
    this.accountService.logout().subscribe(res => {
      let result:string=res.result;
      if(result=='success'){
        this.accountService.closeConnection();
        //localStorage.setItem("isLogin",'false');
        this.nativeStorage.setItem('isLogin', 'false').then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
            );
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
      }else{
        this.toastCtrl.create({
          message: '退出登录失败',
          duration: 2000,
          position: 'bottom'
        }).present();
      }
    }, error => {
      this.toastCtrl.create({
        message: '网络请求出错',
        duration: 2000,
        position: 'bottom'
      }).present();
      console.log(error);
    });
  }
}
