import { Component } from '@angular/core';
import { NavController, ModalController,ToastController,Platform,AlertController } from 'ionic-angular';
import { CreateLessionPage } from '../create-lession/create-lession'
import { LoginPage } from "../login/login";
import { AccountService} from "../../services/httpService/account.service"
import {PersonalInfoPage} from "../personalInfo/personalInfo";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userInfo;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public toastCtrl: ToastController,public accountService:AccountService,
              public platform: Platform,public alertCtrl: AlertController) {

  }
  ionViewWillEnter(){ 
    this.getUserInfo();
  }
  getUserInfo() {
    this.accountService.getUserInfo().subscribe(res=>{
      this.userInfo=res;
    },error=>{
      console.log("error:"+error);
    })
  }

  changePersonalInfo(){
    this.navCtrl.push(PersonalInfoPage,  this.userInfo );
  }

  createLession(){
    this.navCtrl.push(CreateLessionPage);
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
